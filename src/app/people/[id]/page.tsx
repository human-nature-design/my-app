"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { Button } from "@/ui/components/Button";
import { IconButton } from "@/ui/components/IconButton";
import { Person, PersonWithId, Company } from "@/types/person";
import { Dialog } from "@/ui/components/Dialog";
import { TextField } from "@/ui/components/TextField";
import { Select } from "@/ui/components/Select";
import * as SubframeCore from "@subframe/core";

export default function PersonDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [person, setPerson] = useState<PersonWithId | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPerson, setEditedPerson] = useState<Person | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [companies, setCompanies] = useState<Company[]>([]);

  // Check if user came from a company page
  const fromCompany = searchParams.get('from') === 'company';
  const companyId = searchParams.get('companyId');

  const handleBackNavigation = () => {
    if (fromCompany && companyId) {
      router.push(`/companies/${companyId}`);
    } else {
      router.push('/people');
    }
  };

  const fetchPerson = useCallback(async () => {
    try {
      const response = await fetch(`/api/people/${params.id}`);
      if (!response.ok) throw new Error('Failed to fetch person');
      const data = await response.json();
      setPerson(data);
      setEditedPerson(data);
    } catch (error) {
      console.error('Error fetching person:', error);
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    fetchPerson();
  }, [fetchPerson]);

  useEffect(() => {
    if (isEditing) {
      fetchCompanies();
    }
  }, [isEditing]);

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

  const handleUpdate = async () => {
    if (!editedPerson) return;
    
    try {
      const response = await fetch(`/api/people/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedPerson),
      });

      if (!response.ok) throw new Error('Failed to update person');
      
      const data = await response.json();
      setPerson(data);
      setEditedPerson(data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating person:', error);
      throw error;
    }
  };

  const handleCancel = () => {
    setEditedPerson(person);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const response = await fetch(`/api/people/${params.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete person');
      
      handleBackNavigation();
    } catch (error) {
      console.error('Error deleting person:', error);
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <DefaultPageLayout>
        <div className="container max-w-none flex h-full w-full items-center justify-center">
          <span className="text-body font-body text-neutral-500">Loading...</span>
        </div>
      </DefaultPageLayout>
    );
  }

  if (!person) {
    return (
      <DefaultPageLayout>
        <div className="container max-w-none flex h-full w-full flex-col items-center justify-center gap-4">
          <span className="text-body font-body text-neutral-500">Person not found</span>
          <Button onClick={handleBackNavigation}>
            Back to {fromCompany ? 'Company' : 'People'}
          </Button>
        </div>
      </DefaultPageLayout>
    );
  }

  return (
    <DefaultPageLayout>
      <div className="container max-w-none flex h-full w-full flex-col items-start gap-6 bg-default-background py-12">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-4">
            <IconButton
              icon="FeatherArrowLeft"
              onClick={handleBackNavigation}
            />
            <h1 className="text-heading-2 font-heading-2 text-neutral-900">{person.name}</h1>
          </div>
          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <Button
                  variant="neutral-secondary"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleUpdate}
                >
                  Save
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="neutral-secondary"
                  icon="FeatherEdit2"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive-secondary"
                  icon="FeatherTrash"
                  onClick={() => setIsDeleteDialogOpen(true)}
                >
                  Delete
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="w-full max-w-2xl">
          <div className="bg-default-background rounded-lg shadow-sm border border-neutral-200 p-6">
            <div className="grid grid-cols-1 gap-6">
              <div>
                {isEditing ? (
                  <TextField label="Name" variant="outline" error={false} disabled={false}>
                    <TextField.Input
                      value={editedPerson?.name || ""}
                      onChange={e => setEditedPerson(prev => prev ? { ...prev, name: e.target.value } : null)}
                      placeholder="Name"
                    />
                  </TextField>
                ) : (
                  <>
                    <label className="text-body-bold font-body-bold text-neutral-600">Name</label>
                    <p className="text-body font-body text-neutral-900 mt-1">{person.name}</p>
                  </>
                )}
              </div>
              
              <div>
                {isEditing ? (
                  <TextField label="Email" variant="outline" error={false} disabled={false}>
                    <TextField.Input
                      value={editedPerson?.email || ""}
                      onChange={e => setEditedPerson(prev => prev ? { ...prev, email: e.target.value } : null)}
                      placeholder="Email"
                    />
                  </TextField>
                ) : (
                  <>
                    <label className="text-body-bold font-body-bold text-neutral-600">Email</label>
                    <p className="text-body font-body text-neutral-900 mt-1">
                      <a href={`mailto:${person.email}`} className="text-brand-700 hover:underline">
                        {person.email}
                      </a>
                    </p>
                  </>
                )}
              </div>
              
              <div>
                {isEditing ? (
                  <TextField label="Phone" variant="outline" error={false} disabled={false}>
                    <TextField.Input
                      value={editedPerson?.phone || ""}
                      onChange={e => setEditedPerson(prev => prev ? { ...prev, phone: e.target.value } : null)}
                      placeholder="Phone"
                    />
                  </TextField>
                ) : (
                  <>
                    <label className="text-body-bold font-body-bold text-neutral-600">Phone</label>
                    <p className="text-body font-body text-neutral-900 mt-1">
                      {person.phone ? (
                        <a href={`tel:${person.phone}`} className="text-brand-700 hover:underline">
                          {person.phone}
                        </a>
                      ) : (
                        <span className="text-neutral-500">Not provided</span>
                      )}
                    </p>
                  </>
                )}
              </div>
              
              <div>
                {isEditing ? (
                  <Select
                    label="Company"
                    value={editedPerson?.companyId ? editedPerson.companyId.toString() : "none"}
                    onValueChange={value =>
                      setEditedPerson(prev =>
                        prev
                          ? {
                              ...prev,
                              companyId: value === "none" ? undefined : parseInt(value),
                              Companies:
                                value === "none"
                                  ? undefined
                                  : companies.find(c => c.id === parseInt(value))
                            }
                          : null
                      )
                    }
                  >
                    <Select.Item value="none">No Company</Select.Item>
                    {companies.map(company => (
                      <Select.Item key={company.id} value={company.id.toString()}>
                        {company.name}
                      </Select.Item>
                    ))}
                  </Select>
                ) : (
                  <>
                    <label className="text-body-bold font-body-bold text-neutral-600">Company</label>
                    <p className="text-body font-body text-neutral-900 mt-1">
                      {person.Companies?.name || <span className="text-neutral-500">No company</span>}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <Dialog.Content>
            <div className="flex flex-col items-center text-center">
              <SubframeCore.Icon name="FeatherFileWarning" className="w-12 h-12 text-red-500 mb-4" />
              <h2 className="text-heading-3 font-heading-3">Delete Person</h2>
              <p className="text-body font-body text-neutral-600">
                Are you sure you want to delete {person.name}? This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-2 justify-end mt-6">
              <Button
                variant="neutral-secondary"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive-primary"
                onClick={handleDelete}
                loading={deleting}
                disabled={deleting}
              >
                Delete
              </Button>
            </div>
          </Dialog.Content>
        </Dialog>
      </div>
    </DefaultPageLayout>
  );
} 