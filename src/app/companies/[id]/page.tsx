"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { Button } from "@/ui/components/Button";
import { IconButton } from "@/ui/components/IconButton";
import { Company, CompanyWithId } from "@/types/company";
import { PersonWithId } from "@/types/person";
import { Dialog } from "@/ui/components/Dialog";
import { TextField } from "@/ui/components/TextField";
import { Select } from "@/ui/components/Select";
import { Table } from "@/ui/components/Table";
import * as SubframeCore from "@subframe/core";

function CompanyDetail() {
  const router = useRouter();
  const params = useParams();
  const [company, setCompany] = useState<CompanyWithId | null>(null);
  const [people, setPeople] = useState<PersonWithId[]>([]);
  const [loading, setLoading] = useState(true);
  const [peopleLoading, setPeopleLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCompany, setEditedCompany] = useState<Company | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchCompany();
      fetchCompanyPeople();
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
      setEditedCompany(data);
    } catch (error) {
      console.error('Error fetching company:', error);
      router.push('/companies');
    } finally {
      setLoading(false);
    }
  };

  const fetchCompanyPeople = async () => {
    try {
      const response = await fetch(`/api/companies/${params.id}/people`);
      if (!response.ok) throw new Error('Failed to fetch company people');
      const data = await response.json();
      setPeople(data || []);
    } catch (error) {
      console.error('Error fetching company people:', error);
    } finally {
      setPeopleLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!editedCompany) return;
    
    try {
      const response = await fetch(`/api/companies/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedCompany),
      });

      if (!response.ok) throw new Error('Failed to update company');
      
      const data = await response.json();
      setCompany(data);
      setEditedCompany(data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating company:', error);
      throw error;
    }
  };

  const handleCancel = () => {
    setEditedCompany(company);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const response = await fetch(`/api/companies/${params.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete company');
      
      router.push('/companies');
    } catch (error) {
      console.error('Error deleting company:', error);
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

  if (!company) {
    return (
      <DefaultPageLayout>
        <div className="container max-w-none flex h-full w-full flex-col items-center justify-center gap-4">
          <span className="text-body font-body text-neutral-500">Company not found</span>
          <Button onClick={() => router.push('/companies')}>
            Back to Companies
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
              onClick={() => router.push('/companies')}
            />
            <h1 className="text-heading-2 font-heading-2 text-neutral-900">{company.name}</h1>
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
                  <TextField label="Company Name" variant="outline" error={false} disabled={false}>
                    <TextField.Input
                      value={editedCompany?.name || ""}
                      onChange={e => setEditedCompany(prev => prev ? { ...prev, name: e.target.value } : null)}
                      placeholder="Company Name"
                    />
                  </TextField>
                ) : (
                  <>
                    <label className="text-body-bold font-body-bold text-neutral-600">Company Name</label>
                    <p className="text-body font-body text-neutral-900 mt-1">{company.name}</p>
                  </>
                )}
              </div>

              <div>
                {isEditing ? (
                  <TextField label="Website" variant="outline" error={false} disabled={false}>
                    <TextField.Input
                      value={editedCompany?.website || ""}
                      onChange={e => setEditedCompany(prev => prev ? { ...prev, website: e.target.value } : null)}
                      placeholder="Website"
                    />
                  </TextField>
                ) : (
                  <>
                    <label className="text-body-bold font-body-bold text-neutral-600">Website</label>
                    <p className="text-body font-body text-neutral-900 mt-1">
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
                        <span className="text-neutral-500">Not provided</span>
                      )}
                    </p>
                  </>
                )}
              </div>

              <div>
                {isEditing ? (
                  <TextField label="Headquarters" variant="outline" error={false} disabled={false}>
                    <TextField.Input
                      value={editedCompany?.headquarters || ""}
                      onChange={e => setEditedCompany(prev => prev ? { ...prev, headquarters: e.target.value } : null)}
                      placeholder="Headquarters"
                    />
                  </TextField>
                ) : (
                  <>
                    <label className="text-body-bold font-body-bold text-neutral-600">Headquarters</label>
                    <p className="text-body font-body text-neutral-900 mt-1">
                      {company.headquarters || <span className="text-neutral-500">Not provided</span>}
                    </p>
                  </>
                )}
              </div>

              <div>
                {isEditing ? (
                  <Select
                    label="Status"
                    value={editedCompany?.status || "Active"}
                    onValueChange={value =>
                      setEditedCompany(prev =>
                        prev ? { ...prev, status: value } : null
                      )
                    }
                  >
                    <Select.Item value="Active">Active</Select.Item>
                    <Select.Item value="Inactive">Inactive</Select.Item>
                  </Select>
                ) : (
                  <>
                    <label className="text-body-bold font-body-bold text-neutral-600">Status</label>
                    <p className="text-body font-body text-neutral-900 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        company.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {company.status || 'Active'}
                      </span>
                    </p>
                  </>
                )}
              </div>

              <div>
                <label className="text-body-bold font-body-bold text-neutral-600">People Count</label>
                <p className="text-body font-body text-neutral-900 mt-1">
                  {company.peopleCount || 0} {company.peopleCount === 1 ? 'person' : 'people'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* People Section */}
        <div className="w-full">
          <div className="bg-default-background rounded-lg shadow-sm border border-neutral-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-heading-3 font-heading-3 text-neutral-900">People</h2>
              <span className="text-body font-body text-neutral-500">
                {people.length} {people.length === 1 ? 'person' : 'people'}
              </span>
            </div>
            
            {peopleLoading ? (
              <div className="flex items-center justify-center py-8">
                <span className="text-body font-body text-neutral-500">Loading people...</span>
              </div>
            ) : people.length === 0 ? (
              <div className="flex items-center justify-center py-8">
                <span className="text-body font-body text-neutral-500">No people associated with this company</span>
              </div>
            ) : (
              <Table
                header={
                  <Table.HeaderRow>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Email</Table.HeaderCell>
                    <Table.HeaderCell>Phone</Table.HeaderCell>
                  </Table.HeaderRow>
                }
              >
                {people.map((person) => (
                  <Table.Row key={person.id} clickable>
                    <Table.Cell>
                      <button
                        onClick={() => router.push(`/people/${person.id}?from=company&companyId=${params.id}`)}
                        className="whitespace-nowrap text-body-bold font-body-bold text-brand-700 hover:underline text-left"
                      >
                        {person.name}
                      </button>
                    </Table.Cell>
                    <Table.Cell>
                      <span className="whitespace-nowrap text-body font-body text-neutral-500">
                        {person.email}
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <span className="whitespace-nowrap text-body font-body text-neutral-500">
                        {person.phone || '-'}
                      </span>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table>
            )}
          </div>
        </div>

        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <Dialog.Content>
            <div className="flex flex-col items-center text-center">
              <SubframeCore.Icon name="FeatherFileWarning" className="w-12 h-12 text-red-500 mb-4" />
              <h2 className="text-heading-3 font-heading-3">Delete Company</h2>
              <p className="text-body font-body text-neutral-600">
                Are you sure you want to delete {company.name}? This action cannot be undone.
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

export default CompanyDetail; 