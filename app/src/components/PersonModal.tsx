"use client";

import React, { useEffect, useState } from "react";
import { Dialog } from "@/ui/components/Dialog";
import { TextField } from "@/ui/components/TextField";
import { Select } from "@/ui/components/Select";
import { Button } from "@/ui/components/Button";
import { Person, Company } from "@/types/person";

interface PersonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (person: Person) => Promise<void>;
  person?: Person | null;
  mode: 'create' | 'edit';
}

export function PersonModal({ isOpen, onClose, onSave, person, mode }: PersonModalProps) {
  const [formData, setFormData] = useState<Person>({
    name: '',
    email: '',
    phone: '',
    companyId: undefined
  });
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (person) {
      setFormData({
        id: person.id,
        name: person.name,
        email: person.email,
        phone: person.phone || '',
        companyId: person.companyId
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        companyId: undefined
      });
    }
    setErrors({});
  }, [person, isOpen]);

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
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
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
      console.error('Error saving person:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <Dialog.Content>
        <h2 className="text-heading-3 font-heading-3">
          {mode === 'create' ? 'Add New Person' : 'Edit Person'}
        </h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          <TextField
            label="Name"
            error={!!errors.name}
            helpText={errors.name}
          >
            <TextField.Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter name"
              required
            />
          </TextField>
          
          <TextField
            label="Email"
            error={!!errors.email}
            helpText={errors.email}
          >
            <TextField.Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter email"
              required
            />
          </TextField>
          
          <TextField
            label="Phone"
          >
            <TextField.Input
              type="tel"
              value={formData.phone || ''}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="Enter phone number"
            />
          </TextField>
          
          <Select
            label="Company"
            value={formData.companyId?.toString() || 'none'}
            onValueChange={(value) => setFormData({ ...formData, companyId: value === 'none' ? undefined : parseInt(value) })}
          >
            <Select.Item value="none">No Company</Select.Item>
            {companies.map((company) => (
              <Select.Item key={company.id} value={company.id.toString()}>
                {company.name}
              </Select.Item>
            ))}
          </Select>
          
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
              {mode === 'create' ? 'Add Person' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </Dialog.Content>
    </Dialog>
  );
} 