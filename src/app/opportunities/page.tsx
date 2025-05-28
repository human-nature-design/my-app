"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { Button } from "@/ui/components/Button";
import { TextField } from "@/ui/components/TextField";
import { Badge } from "@/ui/components/Badge";
import { Avatar } from "@/ui/components/Avatar";
import { Progress } from "@/ui/components/Progress";
import { OpportunityWithId } from "@/types/opportunity";
import { OpportunityCard, StageColumn } from "./components";

function Opportunities() {
  const router = useRouter();
  const [opportunities, setOpportunities] = useState<OpportunityWithId[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [stageFilter, setStageFilter] = useState<string | undefined>(undefined);

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const fetchOpportunities = async () => {
    try {
      const response = await fetch('/api/opportunities');
      
      if (!response.ok) {
        throw new Error(`Failed to fetch opportunities: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Fetched opportunities data:', data);
      
      setOpportunities(data || []);
    } catch (error) {
      console.error('Error fetching opportunities:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOpportunityStatus = async (opportunityId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/opportunities/${opportunityId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update opportunity status: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating opportunity status:', error);
      throw error;
    }
  };

  const handleOpportunityClick = (opportunity: OpportunityWithId) => {
    router.push(`/opportunities/${opportunity.id}`);
  };

  const moveOpportunity = async (opportunityId: number, newStatus: string, targetId?: number, position?: 'above' | 'below') => {
    // Find the opportunity being moved
    const opportunity = opportunities.find(opp => opp.id === opportunityId);
    if (!opportunity || opportunity.status === newStatus) {
      return;
    }

    console.log(`Moving opportunity ${opportunityId} to ${newStatus}${targetId ? ` ${position || 'near'} ${targetId}` : ''}`);

    // Optimistically update the UI
    let updatedOpportunities = [...opportunities];
    
    // Remove the opportunity from its current position
    updatedOpportunities = updatedOpportunities.filter(opp => opp.id !== opportunityId);
    
    // Update the status
    const updatedOpportunity = { ...opportunity, status: newStatus };
    
    if (targetId && position) {
      // Insert relative to the target opportunity
      const targetIndex = updatedOpportunities.findIndex(opp => opp.id === targetId);
      if (targetIndex !== -1) {
        const insertIndex = position === 'above' ? targetIndex : targetIndex + 1;
        updatedOpportunities.splice(insertIndex, 0, updatedOpportunity);
      } else {
        // Target not found, add to end
        updatedOpportunities.push(updatedOpportunity);
      }
    } else if (targetId) {
      // Legacy: Insert near the target opportunity (default to above)
      const targetIndex = updatedOpportunities.findIndex(opp => opp.id === targetId);
      if (targetIndex !== -1) {
        updatedOpportunities.splice(targetIndex, 0, updatedOpportunity);
      } else {
        // Target not found, add to end of status group
        updatedOpportunities.push(updatedOpportunity);
      }
    } else {
      // Add to end of the opportunities
      updatedOpportunities.push(updatedOpportunity);
    }
    
    setOpportunities(updatedOpportunities);

    try {
      // Update the backend
      await updateOpportunityStatus(opportunityId.toString(), newStatus);
      console.log(`Successfully moved ${opportunity.name} to ${newStatus}`);
    } catch (error) {
      // Revert the optimistic update on error
      console.error('Failed to update opportunity status:', error);
      setOpportunities(opportunities);
      alert('Failed to update opportunity status. Please try again.');
    }
  };

  // Filter opportunities based on search term and stage
  const filteredOpportunities = opportunities.filter(opportunity => {
    const companyName = opportunity.Companies?.name || '';
    const matchesSearch = opportunity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         companyName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStage = !stageFilter || opportunity.status === stageFilter;
    
    return matchesSearch && matchesStage;
  });

  // Group opportunities by stage
  const opportunitiesByStage = {
    'Qualified': filteredOpportunities.filter(opp => opp.status === 'Qualified'),
    'Proposal': filteredOpportunities.filter(opp => opp.status === 'Proposal'),
    'Negotiation': filteredOpportunities.filter(opp => opp.status === 'Negotiation'),
    'Closed Won': filteredOpportunities.filter(opp => opp.status === 'Closed Won')
  };

  // Calculate metrics
  const totalPipeline = opportunities
    .filter(opp => opp.status !== 'Closed Won')
    .reduce((sum, opp) => sum + (opp["dollar amount"] || 0), 0);
  
  const avgDealSize = opportunities.length > 0 
    ? opportunities.reduce((sum, opp) => sum + (opp["dollar amount"] || 0), 0) / opportunities.length 
    : 0;
  
  const winRate = opportunities.length > 0 
    ? (opportunities.filter(opp => opp.status === 'Closed Won').length / opportunities.length) * 100 
    : 0;

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    } else {
      return `$${value}`;
    }
  };

  const getStageVariant = (status: string): "success" | "warning" | "neutral" => {
    switch (status) {
      case 'Closed Won': return 'success';
      case 'Proposal': return 'warning';
      default: return 'neutral';
    }
  };

  if (loading) {
    return (
      <DefaultPageLayout>
        <div className="flex h-full w-full flex-col items-center justify-center">
          <span className="text-body font-body text-subtext-color">Loading opportunities...</span>
        </div>
      </DefaultPageLayout>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <DefaultPageLayout>
        <div className="flex h-full w-full flex-col items-start">
          <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-8 bg-default-background px-8 py-8 overflow-auto">
            <div className="flex w-full items-center justify-between">
              <span className="text-heading-1 font-heading-1 text-default-font">
                Opportunities
              </span>
              <Button
                icon="FeatherPlus"
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
              >
                New Opportunity
              </Button>
            </div>
            <div className="flex w-full flex-wrap items-start gap-4">
              <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2 rounded-md bg-neutral-50 px-4 py-4">
                <span className="text-caption-bold font-caption-bold text-subtext-color">
                  TOTAL PIPELINE
                </span>
                <span className="text-heading-2 font-heading-2 text-default-font">
                  {formatCurrency(totalPipeline)}
                </span>
              </div>
              <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2 rounded-md bg-neutral-50 px-4 py-4">
                <span className="text-caption-bold font-caption-bold text-subtext-color">
                  AVG DEAL SIZE
                </span>
                <span className="text-heading-2 font-heading-2 text-default-font">
                  {formatCurrency(avgDealSize)}
                </span>
              </div>
              <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2 rounded-md bg-neutral-50 px-4 py-4">
                <span className="text-caption-bold font-caption-bold text-subtext-color">
                  WIN RATE
                </span>
                <span className="text-heading-2 font-heading-2 text-default-font">
                  {winRate.toFixed(0)}%
                </span>
              </div>
            </div>
            <div className="flex w-full items-center gap-4">
              <TextField
                className="h-auto w-64 flex-none"
                variant="filled"
                label=""
                helpText=""
                icon="FeatherSearch"
              >
                <TextField.Input
                  placeholder="Search opportunities..."
                  value={searchTerm}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value)}
                />
              </TextField>
              <Button
                variant="neutral-tertiary"
                icon="FeatherFilter"
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
              >
                Filter
              </Button>
            </div>
            <div className="flex w-full grow shrink-0 basis-0 items-start gap-4 overflow-auto">
              {Object.entries(opportunitiesByStage).map(([stage, stageOpportunities]) => (
                <StageColumn
                  key={stage}
                  stage={stage}
                  opportunities={stageOpportunities}
                  onMoveOpportunity={moveOpportunity}
                  onOpportunityClick={handleOpportunityClick}
                  formatCurrency={formatCurrency}
                  getStageVariant={getStageVariant}
                />
              ))}
            </div>
          </div>
        </div>
      </DefaultPageLayout>
    </DndProvider>
  );
}

export default Opportunities;