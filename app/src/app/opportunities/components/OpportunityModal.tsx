"use client";

import React, { useEffect, useState } from "react";
import { Dialog } from "@/ui/components/Dialog";
import { TextField } from "@/ui/components/TextField";
import { Select } from "@/ui/components/Select";
import { Button } from "@/ui/components/Button";
import { Opportunity } from "@/types/opportunity";
import { CompanyWithId } from "@/types/company";
import { DatePicker } from "./DatePicker";

interface OpportunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (opportunity: Opportunity) => Promise<void>;
  opportunity?: Opportunity | null;
  mode: 'create' | 'edit';
}

const opportunityStatuses = [
  'Qualified',
  'Proposal',
  'Negotiation',
  'Closed Won'
];

export function OpportunityModal({ isOpen, onClose, onSave, opportunity, mode }: OpportunityModalProps) {
  const [formData, setFormData] = useState<Opportunity>({
    name: '',
    "dollar amount": 0,
    companyId: 0,
    "close date": null,
    status: 'Qualified'
  });
  const [companies, setCompanies] = useState<CompanyWithId[]>([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (opportunity) {
      setFormData({
        name: opportunity.name,
        "dollar amount": opportunity["dollar amount"],
        companyId: opportunity.companyId,
        "close date": opportunity["close date"],
        status: opportunity.status
      });
    } else {
      setFormData({
        name: '',
        "dollar amount": 0,
        companyId: 0,
        "close date": null,
        status: 'Qualified'
      });
    }
    setErrors({});
  }, [opportunity, isOpen]);

  useEffect(() => {
    if (isOpen) {
      fetchCompanies();
    }
  }, [isOpen]);

  const fetchCompanies = async () => {
    try {
      const response = await fetch('/api/companies');
      if (!response.ok) throw new Error('Failed to fetch companies');
      const data = await response.json();
      setCompanies(data);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Opportunity name is required';
    }
    
    if (!formData.companyId || formData.companyId === 0) {
      newErrors.companyId = 'Company is required';
    }
    
    if (formData["dollar amount"] < 0) {
      newErrors.dollarAmount = 'Dollar amount must be positive';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error('Error saving opportunity:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (date: Date | null) => {
    const dateString = date ? date.toISOString().split('T')[0] : null;
    setFormData({ ...formData, "close date": dateString });
  };

  const getDateValue = (): Date | null => {
    if (!formData["close date"]) return null;
    return new Date(formData["close date"]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <Dialog.Content>
        <h2 className="text-heading-3 font-heading-3">
          {mode === 'create' ? 'Create New Opportunity' : 'Edit Opportunity'}
        </h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          <TextField
            label="Opportunity Name"
            error={!!errors.name}
            helpText={errors.name}
          >
            <TextField.Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter opportunity name"
              required
            />
          </TextField>
          
          <TextField
            label="Dollar Amount"
            error={!!errors.dollarAmount}
            helpText={errors.dollarAmount}
          >
            <TextField.Input
              type="number"
              min="0"
              step="0.01"
              value={formData["dollar amount"].toString()}
              onChange={(e) => setFormData({ ...formData, "dollar amount": parseFloat(e.target.value) || 0 })}
              placeholder="Enter dollar amount"
            />
          </TextField>
          
          <Select
            label="Company"
            error={!!errors.companyId}
            helpText={errors.companyId}
            value={formData.companyId && formData.companyId > 0 ? formData.companyId.toString() : 'none'}
            onValueChange={(value) => setFormData({ ...formData, companyId: value === 'none' ? 0 : parseInt(value) })}
          >
            <Select.Item value="none">Select Company</Select.Item>
            {companies.map((company) => (
              <Select.Item key={company.id} value={company.id.toString()}>
                {company.name}
              </Select.Item>
            ))}
          </Select>
          
          <Select
            label="Status"
            value={formData.status}
            onValueChange={(value) => setFormData({ ...formData, status: value })}
          >
            {opportunityStatuses.map((status) => (
              <Select.Item key={status} value={status}>
                {status}
              </Select.Item>
            ))}
          </Select>
          
          <DatePicker
            label="Close Date"
            value={getDateValue()}
            onChange={handleDateChange}
            placeholder="Select close date"
          />
          
          <div className="flex gap-2 justify-end mt-4">
            <Button
              variant="neutral-secondary"
              onClick={onClose}
              type="button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={loading}
              disabled={loading}
            >
              {mode === 'create' ? 'Create Opportunity' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </Dialog.Content>
    </Dialog>
  );
} 