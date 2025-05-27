"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { Button } from "@/ui/components/Button";
import { CompanyModal } from "@/components/CompanyModal";
import { Company, CompanyWithId } from "@/types/company";

function CompanyDetail() {
  const router = useRouter();
  const params = useParams();
  const [company, setCompany] = useState<CompanyWithId | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchCompany();
    }
  }, [params.id]);

  const fetchCompany = async () => {
    try {
      const response = await fetch(`/api/companies/${params.id}`);
      if (!response.ok) {
        if (response.status === 404) {
          router.push('/companies');
          return;
        }
        throw new Error('Failed to fetch company');
      }
      const data = await response.json();
      setCompany(data);
    } catch (error) {
      console.error('Error fetching company:', error);
      router.push('/companies');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (updatedCompany: Company) => {
    try {
      const response = await fetch(`/api/companies/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCompany),
      });

      if (!response.ok) throw new Error('Failed to update company');
      
      await fetchCompany();
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error updating company:', error);
      throw error;
    }
  };

  if (loading) {
    return (
      <DefaultPageLayout>
        <div className="container max-w-none flex h-full w-full flex-col items-start gap-4 bg-default-background py-12">
          <span className="text-body font-body text-neutral-500">Loading...</span>
        </div>
      </DefaultPageLayout>
    );
  }

  if (!company) {
    return (
      <DefaultPageLayout>
        <div className="container max-w-none flex h-full w-full flex-col items-start gap-4 bg-default-background py-12">
          <span className="text-body font-body text-neutral-500">Company not found</span>
        </div>
      </DefaultPageLayout>
    );
  }

  return (
    <DefaultPageLayout>
      <div className="container max-w-none flex h-full w-full flex-col items-start gap-6 bg-default-background py-12">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="neutral-secondary"
              onClick={() => router.push('/companies')}
            >
              ← Back to Companies
            </Button>
            <h1 className="text-heading-2 font-heading-2">{company.name}</h1>
          </div>
          <Button onClick={() => setIsEditModalOpen(true)}>
            Edit Company
          </Button>
        </div>

        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-lg border border-neutral-border p-6">
            <h2 className="text-heading-3 font-heading-3 mb-4">Company Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-caption-bold font-caption-bold text-neutral-700 block mb-1">
                  Company Name
                </label>
                <p className="text-body font-body text-neutral-900">
                  {company.name}
                </p>
              </div>

              <div>
                <label className="text-caption-bold font-caption-bold text-neutral-700 block mb-1">
                  Website
                </label>
                <p className="text-body font-body text-neutral-900">
                  {company.website ? (
                    <a 
                      href={company.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-brand-700 hover:underline"
                    >
                      {company.website}
                    </a>
                  ) : (
                    '-'
                  )}
                </p>
              </div>

              <div>
                <label className="text-caption-bold font-caption-bold text-neutral-700 block mb-1">
                  Headquarters
                </label>
                <p className="text-body font-body text-neutral-900">
                  {company.headquarters || '-'}
                </p>
              </div>

              <div>
                <label className="text-caption-bold font-caption-bold text-neutral-700 block mb-1">
                  Status
                </label>
                <p className="text-body font-body text-neutral-900">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    company.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {company.status || 'Active'}
                  </span>
                </p>
              </div>

              <div>
                <label className="text-caption-bold font-caption-bold text-neutral-700 block mb-1">
                  People Count
                </label>
                <p className="text-body font-body text-neutral-900">
                  {company.peopleCount || 0} {company.peopleCount === 1 ? 'person' : 'people'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <CompanyModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleEdit}
          company={company}
          mode="edit"
        />
      </div>
    </DefaultPageLayout>
  );
}

export default CompanyDetail; 