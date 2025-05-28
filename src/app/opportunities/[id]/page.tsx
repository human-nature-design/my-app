"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { Button } from "@/ui/components/Button";
import { IconButton } from "@/ui/components/IconButton";
import { Dialog } from "@/ui/components/Dialog";
import { TextField } from "@/ui/components/TextField";
import { Select } from "@/ui/components/Select";
import { Badge } from "@/ui/components/Badge";
import { Progress } from "@/ui/components/Progress";
import { Avatar } from "@/ui/components/Avatar";
import * as SubframeCore from "@subframe/core";
import { Opportunity, OpportunityWithId } from "@/types/opportunity";

export default function OpportunityDetail() {
  const router = useRouter();
  const params = useParams();
  const [opportunity, setOpportunity] = useState<OpportunityWithId | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedOpportunity, setEditedOpportunity] = useState<Opportunity | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchOpportunity();
    }
  }, [params.id]);

  const fetchOpportunity = async () => {
    try {
      const response = await fetch(`/api/opportunities/${params.id}`);
      if (!response.ok) {
        if (response.status === 404) {
          router.push('/opportunities');
          return;
        }
        throw new Error('Failed to fetch opportunity');
      }
      const data = await response.json();
      setOpportunity(data);
      setEditedOpportunity(data);
    } catch (error) {
      console.error('Error fetching opportunity:', error);
      router.push('/opportunities');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!editedOpportunity) return;
    
    try {
      const response = await fetch(`/api/opportunities/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedOpportunity),
      });

      if (!response.ok) throw new Error('Failed to update opportunity');
      
      const data = await response.json();
      setOpportunity(data);
      setEditedOpportunity(data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating opportunity:', error);
      throw error;
    }
  };

  const handleCancel = () => {
    setEditedOpportunity(opportunity);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const response = await fetch(`/api/opportunities/${params.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete opportunity');
      
      router.push('/opportunities');
    } catch (error) {
      console.error('Error deleting opportunity:', error);
      setDeleting(false);
    }
  };

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    } else {
      return `$${value.toLocaleString()}`;
    }
  };

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) {
      return 'No date set';
    }
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }
    
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getStatusBadgeVariant = (status: string): "success" | "warning" | "neutral" => {
    switch (status) {
      case 'Closed Won': return 'success';
      case 'Proposal': return 'warning';
      case 'Negotiation': return 'warning';
      default: return 'neutral';
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

  if (!opportunity) {
    return (
      <DefaultPageLayout>
        <div className="container max-w-none flex h-full w-full flex-col items-center justify-center gap-4">
          <span className="text-body font-body text-neutral-500">Opportunity not found</span>
          <Button onClick={() => router.push('/opportunities')}>
            Back to Opportunities
          </Button>
        </div>
      </DefaultPageLayout>
    );
  }

  const companyName = opportunity.Companies?.name || `Company ${opportunity.companyId}`;

  return (
    <DefaultPageLayout>
      <div className="container max-w-none flex h-full w-full flex-col items-start gap-6 bg-default-background py-12">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-4">
            <IconButton
              icon="FeatherArrowLeft"
              onClick={() => router.push('/opportunities')}
            />
            <h1 className="text-heading-2 font-heading-2 text-neutral-900">{opportunity.name}</h1>
            <Badge variant={getStatusBadgeVariant(opportunity.status)}>
              {opportunity.status}
            </Badge>
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

        <div className="w-full max-w-4xl flex gap-6">
          {/* Main Details */}
          <div className="flex-1">
            <div className="bg-default-background rounded-lg shadow-sm border border-neutral-200 p-6">
              <h2 className="text-heading-3 font-heading-3 text-neutral-900 mb-6">Opportunity Details</h2>
              
              <div className="grid grid-cols-1 gap-6">
                <div>
                  {isEditing ? (
                    <TextField label="Opportunity Name" variant="outline" error={false} disabled={false}>
                      <TextField.Input
                        value={editedOpportunity?.name || ""}
                        onChange={e => setEditedOpportunity(prev => prev ? { ...prev, name: e.target.value } : null)}
                        placeholder="Opportunity Name"
                      />
                    </TextField>
                  ) : (
                    <>
                      <label className="text-body-bold font-body-bold text-neutral-600">Opportunity Name</label>
                      <p className="text-body font-body text-neutral-900 mt-1">{opportunity.name}</p>
                    </>
                  )}
                </div>

                <div>
                  {isEditing ? (
                    <TextField label="Dollar Amount" variant="outline" error={false} disabled={false}>
                      <TextField.Input
                        type="number"
                        value={editedOpportunity?.["dollar amount"]?.toString() || ""}
                        onChange={e => setEditedOpportunity(prev => prev ? { 
                          ...prev, 
                          "dollar amount": parseFloat(e.target.value) || 0 
                        } : null)}
                        placeholder="Dollar Amount"
                      />
                    </TextField>
                  ) : (
                    <>
                      <label className="text-body-bold font-body-bold text-neutral-600">Dollar Amount</label>
                      <p className="text-body font-body text-neutral-900 mt-1">
                        {formatCurrency(opportunity["dollar amount"] || 0)}
                      </p>
                    </>
                  )}
                </div>

                <div>
                  {isEditing ? (
                    <TextField label="Close Date" variant="outline" error={false} disabled={false}>
                      <TextField.Input
                        type="date"
                        value={editedOpportunity?.["close date"] || ""}
                        onChange={e => setEditedOpportunity(prev => prev ? { 
                          ...prev, 
                          "close date": e.target.value 
                        } : null)}
                      />
                    </TextField>
                  ) : (
                    <>
                      <label className="text-body-bold font-body-bold text-neutral-600">Close Date</label>
                      <p className="text-body font-body text-neutral-900 mt-1">
                        {formatDate(opportunity["close date"])}
                      </p>
                    </>
                  )}
                </div>

                <div>
                  {isEditing ? (
                    <Select
                      label="Status"
                      value={editedOpportunity?.status || "Qualified"}
                      onValueChange={value =>
                        setEditedOpportunity(prev =>
                          prev ? { ...prev, status: value } : null
                        )
                      }
                    >
                      <Select.Item value="Qualified">Qualified</Select.Item>
                      <Select.Item value="Proposal">Proposal</Select.Item>
                      <Select.Item value="Negotiation">Negotiation</Select.Item>
                      <Select.Item value="Closed Won">Closed Won</Select.Item>
                    </Select>
                  ) : (
                    <>
                      <label className="text-body-bold font-body-bold text-neutral-600">Status</label>
                      <p className="text-body font-body text-neutral-900 mt-1">
                        <Badge variant={getStatusBadgeVariant(opportunity.status)}>
                          {opportunity.status}
                        </Badge>
                      </p>
                    </>
                  )}
                </div>

                {opportunity.created_at && (
                  <div>
                    <label className="text-body-bold font-body-bold text-neutral-600">Created</label>
                    <p className="text-body font-body text-neutral-900 mt-1">
                      {formatDate(opportunity.created_at)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Company Information */}
          <div className="w-80 flex-none">
            <div className="bg-default-background rounded-lg shadow-sm border border-neutral-200 p-6">
              <h3 className="text-heading-3 font-heading-3 text-neutral-900 mb-6">Company</h3>
              
              <div className="flex items-center gap-3 mb-4">
                <Avatar
                  size="medium"
                  image={opportunity.company_avatar}
                >
                  {companyName.charAt(0).toUpperCase()}
                </Avatar>
                <div>
                  <button
                    onClick={() => router.push(`/companies/${opportunity.companyId}`)}
                    className="text-body-bold font-body-bold text-brand-700 hover:underline text-left"
                  >
                    {companyName}
                  </button>
                  {opportunity.Companies?.status && (
                    <p className="text-caption font-caption text-neutral-500">
                      {opportunity.Companies.status}
                    </p>
                  )}
                </div>
              </div>

              {opportunity.Companies?.website && (
                <div className="mb-3">
                  <label className="text-caption-bold font-caption-bold text-neutral-600">Website</label>
                  <p className="text-body font-body text-neutral-900">
                    <a 
                      href={opportunity.Companies.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-brand-700 hover:underline"
                    >
                      {opportunity.Companies.website}
                    </a>
                  </p>
                </div>
              )}

              {opportunity.Companies?.headquarters && (
                <div>
                  <label className="text-caption-bold font-caption-bold text-neutral-600">Headquarters</label>
                  <p className="text-body font-body text-neutral-900">
                    {opportunity.Companies.headquarters}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <Dialog.Content>
            <div className="flex flex-col items-center text-center">
              <SubframeCore.Icon name="FeatherFileWarning" className="w-12 h-12 text-red-500 mb-4" />
              <h2 className="text-heading-3 font-heading-3">Delete Opportunity</h2>
              <p className="text-body font-body text-neutral-600">
                Are you sure you want to delete {opportunity.name}? This action cannot be undone.
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
