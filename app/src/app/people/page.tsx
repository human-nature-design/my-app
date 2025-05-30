"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { Button } from "@/ui/components/Button";
import { TextField } from "@/ui/components/TextField";
import { Table } from "@/ui/components/Table";
import { DropdownMenu } from "@/ui/components/DropdownMenu";
import { Select } from "@/ui/components/Select";
import { Badge } from "@/ui/components/Badge";
import * as SubframeCore from "@subframe/core";
import { IconButton } from "@/ui/components/IconButton";
import { PersonModal } from "@/components/PersonModal";
import { Dialog } from "@/ui/components/Dialog";

import { Person, PersonWithId } from "@/types/person";
import { CompanyWithId } from "@/types/company";

function People() {
  const router = useRouter();
  const [people, setPeople] = useState<PersonWithId[]>([]);
  const [companies, setCompanies] = useState<CompanyWithId[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; person: PersonWithId | null }>({
    isOpen: false,
    person: null
  });
  const [deleting, setDeleting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | undefined>(undefined);

  useEffect(() => {
    fetchPeople();
    fetchCompanies();
  }, []);

  const fetchPeople = async () => {
    try {
      const response = await fetch('/api/people');
      if (!response.ok) throw new Error('Failed to fetch people');
      const data = await response.json();
      setPeople(data || []);
    } catch (error) {
      console.error('Error fetching people:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCompanies = async () => {
    try {
      const response = await fetch('/api/companies');
      if (!response.ok) throw new Error('Failed to fetch companies');
      const data = await response.json();
      setCompanies(data || []);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  const handleCreate = async (newPerson: Person) => {
    try {
      const response = await fetch('/api/people', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPerson),
      });

      if (!response.ok) throw new Error('Failed to create person');
      
      await fetchPeople();
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('Error creating person:', error);
      throw error;
    }
  };

  const handleDelete = async () => {
    if (!deleteDialog.person) return;
    
    setDeleting(true);
    try {
      const response = await fetch(`/api/people/${deleteDialog.person.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete person');
      
      await fetchPeople();
      setDeleteDialog({ isOpen: false, person: null });
    } catch (error) {
      console.error('Error deleting person:', error);
    } finally {
      setDeleting(false);
    }
  };

  const handlePersonClick = (person: PersonWithId) => {
    router.push(`/people/${person.id}`);
  };

  const handleCompanyClick = (companyId: number) => {
    router.push(`/companies/${companyId}`);
  };

  // Filter people based on search term and company
  const filteredPeople = people.filter(person => {
    const matchesSearch = person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (person.email && person.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (person.phone && person.phone.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCompany = !selectedCompanyId || person.companyId?.toString() === selectedCompanyId;
    
    return matchesSearch && matchesCompany;
  });

  return (
    <DefaultPageLayout>
      <div className="flex h-full w-full flex-col items-start">
        <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-6 mobile:gap-4 bg-default-background px-8 mobile:px-4 py-8 mobile:py-6 overflow-auto">
          <div className="flex w-full items-center justify-between">
            <span className="text-heading-1 font-heading-1 text-default-font mobile:text-heading-2 mobile:font-heading-2">
              People
            </span>
            <Button
              icon="FeatherPlus"
              onClick={() => setIsCreateModalOpen(true)}
              className="mobile:text-body mobile:font-body"
            >
              <span className="hidden sm:inline">Add Person</span>
              <span className="inline sm:hidden">Add</span>
            </Button>
          </div>
          <div className="flex w-full flex-col items-start gap-4">
            <div className="flex flex-col sm:flex-row w-full items-start sm:items-center gap-4">
              <TextField
                className="h-auto w-full sm:w-48 flex-none"
                label=""
                helpText=""
                icon="FeatherSearch"
              >
                <TextField.Input
                  className="w-full"
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
                placeholder="Filter by company"
                helpText=""
                icon={null}
                value={selectedCompanyId}
                onValueChange={(value: string) => setSelectedCompanyId(value === "all" ? undefined : value)}
                className="w-full sm:w-auto"
              >
                <Select.Item value="all">All Companies</Select.Item>
                {companies.map((company) => (
                  <Select.Item key={company.id} value={company.id.toString()}>
                    {company.name}
                  </Select.Item>
                ))}
              </Select>
            </div>
            
            {/* Desktop Table View */}
            <div className="hidden sm:block w-full">
              <Table
                header={
                  <Table.HeaderRow>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Email</Table.HeaderCell>
                    <Table.HeaderCell>Phone</Table.HeaderCell>
                    <Table.HeaderCell>Company</Table.HeaderCell>
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
                ) : filteredPeople.length === 0 ? (
                  <Table.Row>
                    <Table.Cell colSpan={5}>
                      <span className="text-body font-body text-neutral-500">No people found</span>
                    </Table.Cell>
                  </Table.Row>
                ) : (
                  filteredPeople.map((person) => (
                    <Table.Row key={person.id}>
                      <Table.Cell>
                        <button
                          onClick={() => handlePersonClick(person)}
                          className="whitespace-nowrap text-body-bold font-body-bold text-neutral-700 hover:underline text-left"
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
                      <Table.Cell>
                        {person.Companies?.name ? (
                          <button
                            onClick={() => handleCompanyClick(person.companyId!)}
                            className="inline-flex"
                          >
                            <Badge 
                              variant="neutral" 
                              className="hover:bg-neutral-200 transition-colors cursor-pointer"
                            >
                              {person.Companies.name}
                            </Badge>
                          </button>
                        ) : (
                          <span className="text-body font-body text-neutral-500">-</span>
                        )}
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
                                    onClick={() => handlePersonClick(person)}
                                  >
                                    Edit
                                  </DropdownMenu.DropdownItem>
                                  <DropdownMenu.DropdownItem 
                                    icon="FeatherTrash"
                                    onClick={() => setDeleteDialog({ isOpen: true, person })}
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
            
            {/* Mobile Card View */}
            <div className="sm:hidden w-full space-y-4">
              {loading ? (
                <div className="text-body font-body text-neutral-500 text-center py-8">Loading...</div>
              ) : filteredPeople.length === 0 ? (
                <div className="text-body font-body text-neutral-500 text-center py-8">No people found</div>
              ) : (
                filteredPeople.map((person) => (
                  <div 
                    key={person.id} 
                    className="bg-neutral-50 border border-neutral-border rounded-md p-4 space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <button
                          onClick={() => handlePersonClick(person)}
                          className="text-body-bold font-body-bold text-default-font hover:underline text-left"
                        >
                          {person.name}
                        </button>
                      </div>
                      <SubframeCore.DropdownMenu.Root>
                        <SubframeCore.DropdownMenu.Trigger asChild={true}>
                          <IconButton
                            size="small"
                            icon="FeatherMoreVertical"
                            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                          />
                        </SubframeCore.DropdownMenu.Trigger>
                        <SubframeCore.DropdownMenu.Portal>
                          <SubframeCore.DropdownMenu.Content
                            side="bottom"
                            align="end"
                            sideOffset={4}
                            asChild={true}
                          >
                            <DropdownMenu>
                              <DropdownMenu.DropdownItem 
                                icon="FeatherEdit2"
                                onClick={() => handlePersonClick(person)}
                              >
                                Edit
                              </DropdownMenu.DropdownItem>
                              <DropdownMenu.DropdownItem 
                                icon="FeatherTrash"
                                onClick={() => setDeleteDialog({ isOpen: true, person })}
                              >
                                Delete
                              </DropdownMenu.DropdownItem>
                            </DropdownMenu>
                          </SubframeCore.DropdownMenu.Content>
                        </SubframeCore.DropdownMenu.Portal>
                      </SubframeCore.DropdownMenu.Root>
                    </div>
                    
                    <div className="space-y-1 text-body font-body text-subtext-color">
                      <div className="flex items-center gap-2">
                        <SubframeCore.Icon name="FeatherMail" className="w-3 h-3" />
                        <span className="truncate">{person.email}</span>
                      </div>
                      {person.phone && (
                        <div className="flex items-center gap-2">
                          <SubframeCore.Icon name="FeatherPhone" className="w-3 h-3" />
                          <span>{person.phone}</span>
                        </div>
                      )}
                    </div>
                    
                    {person.Companies?.name && (
                      <div>
                        <button
                          onClick={() => handleCompanyClick(person.companyId!)}
                          className="inline-flex"
                        >
                          <Badge 
                            variant="neutral" 
                            className="hover:bg-neutral-200 transition-colors cursor-pointer"
                          >
                            {person.Companies.name}
                          </Badge>
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <PersonModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSave={handleCreate}
          mode="create"
        />

        <Dialog 
          open={deleteDialog.isOpen} 
          onOpenChange={(open) => setDeleteDialog({ isOpen: open, person: deleteDialog.person })}
        >
          <Dialog.Content>
            <div className="flex flex-col items-center text-center">
              <SubframeCore.Icon name="FeatherFileWarning" className="w-12 h-12 text-red-500 mb-4" />
              <h2 className="text-heading-3 font-heading-3">Delete Person</h2>
              <p className="text-body font-body text-neutral-600">
                Are you sure you want to delete {deleteDialog.person?.name}? This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-2 justify-end mt-6">
              <Button
                variant="neutral-secondary"
                onClick={() => setDeleteDialog({ isOpen: false, person: null })}
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

export default People;

