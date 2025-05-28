"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { Button } from "@/ui/components/Button";
import { TextField } from "@/ui/components/TextField";
import { Badge } from "@/ui/components/Badge";
import { Avatar } from "@/ui/components/Avatar";
import { Progress } from "@/ui/components/Progress";
import { OpportunityWithId } from "@/types/opportunity";

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

  const handleOpportunityClick = (opportunity: OpportunityWithId) => {
    router.push(`/opportunities/${opportunity.id}`);
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

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) {
      return 'No date set';
    }
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getStageVariant = (status: string): "success" | "warning" | "neutral" => {
    switch (status) {
      case 'Closed Won': return 'success';
      case 'Proposal': return 'warning';
      default: return 'neutral';
    }
  };

  const renderOpportunityCard = (opportunity: OpportunityWithId) => {
    const companyName = opportunity.Companies?.name || `Company ${opportunity.companyId}`;
    
    return (
      <div 
        key={opportunity.id} 
        className="flex w-full flex-col items-start gap-2 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
        onClick={() => handleOpportunityClick(opportunity)}
      >
        <div className="flex w-full items-center justify-between">
          <span className="text-body-bold font-body-bold text-default-font">
            {opportunity.name}
          </span>
          <Badge variant="success">{formatCurrency(opportunity["dollar amount"])}</Badge>
        </div>
        <div className="flex w-full items-center gap-2">
          <Avatar
            size="small"
            image={opportunity.company_avatar}
          >
            {companyName.charAt(0).toUpperCase()}
          </Avatar>
          <span className="text-body font-body text-subtext-color">
            {companyName}
          </span>
        </div>
        <div className="flex w-full items-center justify-between">
          <span className="text-caption font-caption text-subtext-color">
            {opportunity.status === 'Closed Won' ? 'Closed:' : 'Close:'} {formatDate(opportunity["close date"])}
          </span>
          <Progress value={opportunity.progress || 0} />
        </div>
      </div>
    );
  };

  const renderStageColumn = (stage: string, opportunities: OpportunityWithId[]) => (
    <div key={stage} className="flex w-64 flex-none flex-col items-start gap-4">
      <div className="flex w-full items-center justify-between rounded-md bg-neutral-50 px-4 py-2">
        <span className="text-body-bold font-body-bold text-default-font">
          {stage}
        </span>
        <Badge variant={getStageVariant(stage)}>{opportunities.length}</Badge>
      </div>
      <div className="flex w-full flex-col items-start gap-4">
        {opportunities.map(renderOpportunityCard)}
      </div>
    </div>
  );

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
            {Object.entries(opportunitiesByStage).map(([stage, stageOpportunities]) => 
              renderStageColumn(stage, stageOpportunities)
            )}
          </div>
        </div>
      </div>
    </DefaultPageLayout>
  );
}

export default Opportunities;