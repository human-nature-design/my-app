"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { UniversalSearch } from "@/ui/components/UniversalSearch";
import { Button } from "@/ui/components/Button";
import { Table } from "@/ui/components/Table";
import { DropdownMenu } from "@/ui/components/DropdownMenu";
import * as SubframeCore from "@subframe/core";
import { IconButton } from "@/ui/components/IconButton";
import { CompanyModal } from "@/components/CompanyModal";
import { Dialog } from "@/ui/components/Dialog";

import { Company, CompanyWithId } from "@/types/company";

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

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await fetch('/api/companies');
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
      
      const response = await fetch('/api/companies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCompany),
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server error:', errorData);
        throw new Error(errorData.error || 'Failed to create company');
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
      const response = await fetch(`/api/companies/${deleteDialog.company.id}`, {
        method: 'DELETE',
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

  return (
    <DefaultPageLayout>
      <div className="container max-w-none flex h-full w-full flex-col items-start gap-4 bg-default-background py-12">
        <UniversalSearch icon="FeatherSearch" />
        <div className="flex w-full items-center gap-2">
          <Button onClick={() => setIsCreateModalOpen(true)}>
            Add company
          </Button>
        </div>
        <Table
          header={
            <Table.HeaderRow>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Website</Table.HeaderCell>
              <Table.HeaderCell>Headquarters</Table.HeaderCell>
              <Table.HeaderCell>People Count</Table.HeaderCell>
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
          ) : companies.length === 0 ? (
            <Table.Row>
              <Table.Cell colSpan={5}>
                <span className="text-body font-body text-neutral-500">No companies found</span>
              </Table.Cell>
            </Table.Row>
          ) : (
            companies.map((company) => (
              <Table.Row key={company.id}>
                <Table.Cell>
                  <button
                    onClick={() => handleCompanyClick(company)}
                    className="whitespace-nowrap text-body-bold font-body-bold text-brand-700 hover:underline text-left"
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
                  <span className="whitespace-nowrap text-body font-body text-neutral-500">
                    {company.peopleCount || 0}
                  </span>
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
            <h2 className="text-heading-3 font-heading-3">Delete Company</h2>
            <p className="text-body font-body text-neutral-600">
              Are you sure you want to delete {deleteDialog.company?.name}? This action cannot be undone.
            </p>
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