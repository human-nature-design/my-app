"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { Button } from "@/ui/components/Button";
import { TextField } from "@/ui/components/TextField";
import { Select } from "@/ui/components/Select";
import { Table } from "@/ui/components/Table";
import { Badge } from "@/ui/components/Badge";
import { DropdownMenu } from "@/ui/components/DropdownMenu";
import * as SubframeCore from "@subframe/core";
import { IconButton } from "@/ui/components/IconButton";
import { CompanyModal } from "../../components/CompanyModal";
import { Dialog } from "@/ui/components/Dialog";

import { Company, CompanyWithId } from "../../types/company";

function Companies() {
  const router = useRouter();
  const [companies, setCompanies] = useState<CompanyWithId[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; company: CompanyWithId | null }>({
    isOpen: false,
    company: null
  });
  const [deleting, setDeleting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseKey) {
        throw new Error('Missing Supabase environment variables');
      }

      const response = await fetch(`${supabaseUrl}/rest/v1/Companies?order=name.asc`, {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error('Failed to fetch companies');
      const data = await response.json();
      
      setCompanies(data || []);
    } catch (error) {
      console.error('Error fetching companies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (newCompany: Company) => {
    try {
      console.log('Creating company:', newCompany);
      
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseKey) {
        throw new Error('Missing Supabase environment variables');
      }

      // Prepare the data to match your successful Postman test
      const companyData = {
        name: newCompany.name,
        website: newCompany.website || null,
        headquarters: newCompany.headquarters || null,
        status: newCompany.status || 'Active'
      };

      const response = await fetch(`${supabaseUrl}/rest/v1/Companies`, {
        method: 'POST',
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(companyData),
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.text();
        console.error('Server error:', errorData);
        throw new Error(`Failed to create company: ${response.status} ${response.statusText}`);
      }
      
      const createdCompany = await response.json();
      console.log('Company created successfully:', createdCompany);
      
      await fetchCompanies();
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('Error creating company:', error);
      // Re-throw to let the modal handle the error display
      throw error;
    }
  };

  const handleDelete = async () => {
    if (!deleteDialog.company) return;
    
    setDeleting(true);
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseKey) {
        throw new Error('Missing Supabase environment variables');
      }

      const response = await fetch(`${supabaseUrl}/rest/v1/Companies?id=eq.${deleteDialog.company.id}`, {
        method: 'DELETE',
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error('Failed to delete company');
      
      await fetchCompanies();
      setDeleteDialog({ isOpen: false, company: null });
    } catch (error) {
      console.error('Error deleting company:', error);
    } finally {
      setDeleting(false);
    }
  };

  const handleCompanyClick = (company: CompanyWithId) => {
    router.push(`/companies/${company.id}`);
  };

  // Filter companies based on search term and status
  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (company.website && company.website.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (company.headquarters && company.headquarters.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = !statusFilter || company.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Prospect':
        return 'warning';
      case 'Inactive':
        return 'neutral';
      default:
        return 'neutral';
    }
  };

  return (
    <DefaultPageLayout>
      <div className="flex h-full w-full flex-col items-start">
        <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-8 bg-default-background px-8 py-8 overflow-auto">
          <div className="flex w-full items-center justify-between">
            <span className="text-heading-1 font-heading-1 text-default-font">
              Companies
            </span>
            <Button
              icon="FeatherPlus"
              onClick={() => setIsCreateModalOpen(true)}
            >
              Add Company
            </Button>
          </div>
          <div className="flex w-full flex-col items-start gap-4">
            <div className="flex w-full items-center gap-4">
              <TextField
                className="h-auto w-48 flex-none"
                label=""
                helpText=""
                icon="FeatherSearch"
              >
                <TextField.Input
                  className="w-auto grow shrink-0 basis-0"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value)}
                />
              </TextField>
              <Select
                disabled={false}
                error={false}
                variant="outline"
                label=""
                placeholder="Filter by status"
                helpText=""
                icon={null}
                value={statusFilter}
                onValueChange={(value: string) => setStatusFilter(value === "all" ? undefined : value)}
              >
                <Select.Item value="all">All Statuses</Select.Item>
                <Select.Item value="Active">Active</Select.Item>
                <Select.Item value="Prospect">Prospect</Select.Item>
                <Select.Item value="Inactive">Inactive</Select.Item>
              </Select>
            </div>
            <Table
              header={
                <Table.HeaderRow>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Website</Table.HeaderCell>
                  <Table.HeaderCell>Headquarters</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                  <Table.HeaderCell></Table.HeaderCell>
                </Table.HeaderRow>
              }
            >
              {loading ? (
                <Table.Row>
                  <Table.Cell colSpan={5}>
                    <span className="text-body font-body text-neutral-500">Loading...</span>
                  </Table.Cell>
                </Table.Row>
              ) : filteredCompanies.length === 0 ? (
                <Table.Row>
                  <Table.Cell colSpan={5}>
                    <span className="text-body font-body text-neutral-500">No companies found</span>
                  </Table.Cell>
                </Table.Row>
              ) : (
                filteredCompanies.map((company) => (
                  <Table.Row key={company.id}>
                    <Table.Cell>
                      <button
                        onClick={() => handleCompanyClick(company)}
                        className="whitespace-nowrap text-body-bold font-body-bold text-neutral-700 hover:underline text-left"
                      >
                        {company.name}
                      </button>
                    </Table.Cell>
                    <Table.Cell>
                      <span className="whitespace-nowrap text-body font-body text-neutral-500">
                        {company.website || '-'}
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <span className="whitespace-nowrap text-body font-body text-neutral-500">
                        {company.headquarters || '-'}
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <Badge variant={getStatusBadgeVariant(company.status || 'Active')}>
                        {company.status || 'Active'}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex grow shrink-0 basis-0 items-center justify-end">
                        <SubframeCore.DropdownMenu.Root>
                          <SubframeCore.DropdownMenu.Trigger asChild={true}>
                            <IconButton
                              size="medium"
                              icon="FeatherMoreHorizontal"
                              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                            />
                          </SubframeCore.DropdownMenu.Trigger>
                          <SubframeCore.DropdownMenu.Portal>
                            <SubframeCore.DropdownMenu.Content
                              side="bottom"
                              align="end"
                              sideOffset={8}
                              asChild={true}
                            >
                              <DropdownMenu>
                                <DropdownMenu.DropdownItem 
                                  icon="FeatherEdit2"
                                  onClick={() => handleCompanyClick(company)}
                                >
                                  Edit
                                </DropdownMenu.DropdownItem>
                                <DropdownMenu.DropdownItem 
                                  icon="FeatherTrash"
                                  onClick={() => setDeleteDialog({ isOpen: true, company })}
                                >
                                  Delete
                                </DropdownMenu.DropdownItem>
                              </DropdownMenu>
                            </SubframeCore.DropdownMenu.Content>
                          </SubframeCore.DropdownMenu.Portal>
                        </SubframeCore.DropdownMenu.Root>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))
              )}
            </Table>
          </div>
        </div>

        <CompanyModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSave={handleCreate}
          mode="create"
        />

        <Dialog 
          open={deleteDialog.isOpen} 
          onOpenChange={(open) => setDeleteDialog({ isOpen: open, company: deleteDialog.company })}
        >
          <Dialog.Content>
            <div className="flex flex-col items-center text-center">
              <SubframeCore.Icon name="FeatherFileWarning" className="w-12 h-12 text-red-500 mb-4" />
              <h2 className="text-heading-3 font-heading-3">Delete Company</h2>
              <p className="text-body font-body text-neutral-600">
                Are you sure you want to delete {deleteDialog.company?.name}? This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-2 justify-end mt-6">
              <Button
                variant="neutral-secondary"
                onClick={() => setDeleteDialog({ isOpen: false, company: null })}
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

export default Companies; 