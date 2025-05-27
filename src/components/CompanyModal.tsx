"use client";

import React, { useEffect, useState } from "react";
import { Dialog } from "@/ui/components/Dialog";
import { TextField } from "@/ui/components/TextField";
import { Button } from "@/ui/components/Button";
import { Company } from "@/types/company";

interface CompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (company: Company) => Promise<void>;
  company?: Company | null;
  mode: 'create' | 'edit';
}

export function CompanyModal({ isOpen, onClose, onSave, company, mode }: CompanyModalProps) {
  const [formData, setFormData] = useState<Company>({
    name: '',
    website: '',
    headquarters: '',
    status: 'Active'
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string>('');

  useEffect(() => {
    if (company) {
      setFormData({
        id: company.id,
        name: company.name,
        website: company.website || '',
        headquarters: company.headquarters || '',
        status: company.status || 'Active'
      });
    } else {
      setFormData({
        name: '',
        website: '',
        headquarters: '',
        status: 'Active'
      });
    }
    setErrors({});
    setSubmitError('');
  }, [company, isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Company name is required';
    }
    
    if (formData.website && formData.website.trim() && !isValidUrl(formData.website)) {
      newErrors.website = 'Please enter a valid website URL';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url: string) => {
    try {
      // Remove any leading/trailing whitespace
      const trimmedUrl = url.trim();
      
      // Allow simple domain names without protocol or www
      // Basic pattern: at least one character, a dot, and a TLD
      const domainPattern = /^[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
      
      // If it looks like a simple domain, it's valid
      if (domainPattern.test(trimmedUrl)) {
        return true;
      }
      
      // If it starts with http/https, validate as full URL
      if (trimmedUrl.startsWith('http://') || trimmedUrl.startsWith('https://')) {
        new URL(trimmedUrl);
        return true;
      }
      
      // Try adding https:// and see if it becomes a valid URL
      try {
        new URL(`https://${trimmedUrl}`);
        return true;
      } catch {
        return false;
      }
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setSubmitError('');
    
    try {
      // Ensure website has protocol if provided
      const processedData = {
        ...formData,
        website: formData.website && formData.website.trim() 
          ? (formData.website.startsWith('http') ? formData.website : `https://${formData.website}`)
          : undefined,
        headquarters: formData.headquarters && formData.headquarters.trim() 
          ? formData.headquarters.trim()
          : undefined,
        status: formData.status || 'Active'
      };
      
      console.log('Submitting company data:', processedData);
      await onSave(processedData);
      onClose();
    } catch (error) {
      console.error('Error saving company:', error);
      setSubmitError(error instanceof Error ? error.message : 'Failed to save company');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <Dialog.Content>
        <h2 className="text-heading-3 font-heading-3">
          {mode === 'create' ? 'Add New Company' : 'Edit Company'}
        </h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          {submitError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{submitError}</p>
            </div>
          )}
          
          <TextField
            label="Company Name"
            error={!!errors.name}
            helpText={errors.name}
          >
            <TextField.Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter company name"
              required
            />
          </TextField>
          
          <TextField
            label="Website"
            error={!!errors.website}
            helpText={errors.website}
          >
            <TextField.Input
              type="text"
              value={formData.website || ''}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              placeholder="Enter website (e.g., example.com or https://example.com)"
            />
          </TextField>
          
          <TextField
            label="Headquarters"
          >
            <TextField.Input
              value={formData.headquarters || ''}
              onChange={(e) => setFormData({ ...formData, headquarters: e.target.value })}
              placeholder="Enter headquarters location"
            />
          </TextField>
          
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
              {mode === 'create' ? 'Add Company' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </Dialog.Content>
    </Dialog>
  );
} 