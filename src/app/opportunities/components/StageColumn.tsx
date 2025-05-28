import React from 'react';
import { useDrop } from 'react-dnd';
import { Badge } from "@/ui/components/Badge";
import { OpportunityWithId } from "@/types/opportunity";
import { OpportunityCard } from "./OpportunityCard";
import { ItemType, DragItem } from './types';

interface StageColumnProps {
  stage: string;
  opportunities: OpportunityWithId[];
  onMoveOpportunity: (opportunityId: number, newStatus: string, targetId?: number) => void;
  onOpportunityClick: (opportunity: OpportunityWithId) => void;
  formatCurrency: (value: number) => string;
  getStageVariant: (status: string) => "success" | "warning" | "neutral";
}

export const StageColumn: React.FC<StageColumnProps> = ({
  stage,
  opportunities,
  onMoveOpportunity,
  onOpportunityClick,
  formatCurrency,
  getStageVariant,
}) => {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: ItemType.OPPORTUNITY,
    drop: (item: DragItem, monitor) => {
      // Only handle drops on the column itself (not on cards)
      const didDropOnCard = monitor.didDrop();
      if (!didDropOnCard && item.status !== stage) {
        // Drop at the end of the column
        onMoveOpportunity(item.id, stage);
      }
    },
    canDrop: (item: DragItem) => {
      return item.status !== stage;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }), // Only when directly over column, not cards
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = isOver && canDrop;
  const isEmpty = opportunities.length === 0;

  return (
    <div
      ref={drop}
      className={`flex w-64 flex-none flex-col items-start gap-4 min-h-96 p-2 rounded-lg transition-all duration-200 ${
        isActive
          ? 'bg-transparent border-2 border-pink-500 shadow-inner'
          : canDrop && isOver
          ? 'bg-transparent border-2 border-pink-300'
          : ''
      }`}
    >
      <div className="flex w-full items-center justify-between rounded-md bg-neutral-50 px-4 py-2">
        <span className="text-body-bold font-body-bold text-default-font">
          {stage}
        </span>
        <Badge variant={getStageVariant(stage)}>{opportunities.length}</Badge>
      </div>
      <div className={`flex w-full flex-col items-start gap-4 flex-grow ${isEmpty && isActive ? 'justify-center items-center' : ''}`}>
        {opportunities.map((opportunity) => (
          <OpportunityCard
            key={opportunity.id}
            opportunity={opportunity}
            onOpportunityClick={onOpportunityClick}
            onMoveOpportunity={onMoveOpportunity}
            formatCurrency={formatCurrency}
          />
        ))}
        {isEmpty && isActive && (
          <div className="w-full h-40 border-2 border-pink-500 border-dashed rounded-md bg-transparent flex items-center justify-center opacity-70">
            <span className="text-pink-600 text-sm font-medium">Drop here to move to {stage}</span>
          </div>
        )}
        {isEmpty && canDrop && !isActive && (
          <div className="w-full h-40 border-2 border-gray-300 border-dashed rounded-md bg-transparent flex items-center justify-center opacity-40">
          </div>
        )}
        {!isEmpty && isActive && (
          <div className="w-full h-12 border-2 border-pink-500 border-dashed rounded-md bg-transparent flex items-center justify-center opacity-70 mt-2">
            <span className="text-pink-600 text-xs font-medium">Drop here to add to end</span>
          </div>
        )}
      </div>
    </div>
  );
}; 