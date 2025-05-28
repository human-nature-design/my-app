import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Badge } from "@/ui/components/Badge";
import { Avatar } from "@/ui/components/Avatar";
import { Progress } from "@/ui/components/Progress";
import { OpportunityWithId } from "@/types/opportunity";
import { ItemType, DragItem } from './types';

interface OpportunityCardProps {
  opportunity: OpportunityWithId;
  onOpportunityClick: (opportunity: OpportunityWithId) => void;
  onMoveOpportunity: (opportunityId: number, newStatus: string, targetId?: number, position?: 'above' | 'below') => void;
  formatCurrency: (value: number) => string;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({
  opportunity,
  onOpportunityClick,
  onMoveOpportunity,
  formatCurrency,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType.OPPORTUNITY,
    item: { 
      id: opportunity.id, 
      status: opportunity.status,
      opportunity: opportunity 
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    options: {
      dropEffect: 'move',
    },
  }));

  const [{ isOver, dropPosition }, drop] = useDrop(() => ({
    accept: ItemType.OPPORTUNITY,
    drop: (item: DragItem, monitor) => {
      if (item.id !== opportunity.id) {
        const clientOffset = monitor.getClientOffset();
        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        
        if (clientOffset && hoverBoundingRect) {
          const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
          const hoverClientY = clientOffset.y - hoverBoundingRect.top;
          const position = hoverClientY < hoverMiddleY ? 'above' : 'below';
          
          onMoveOpportunity(item.id, opportunity.status, opportunity.id, position);
        }
      }
    },
    hover: (item: DragItem, monitor) => {
      if (item.id === opportunity.id) return;
      
      const clientOffset = monitor.getClientOffset();
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      
      if (clientOffset && hoverBoundingRect) {
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        return { position: hoverClientY < hoverMiddleY ? 'above' : 'below' };
      }
      return { position: 'above' };
    },
    canDrop: (item: DragItem) => {
      return item.id !== opportunity.id;
    },
    collect: (monitor) => {
      const clientOffset = monitor.getClientOffset();
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      let position: 'above' | 'below' = 'above';
      
      if (clientOffset && hoverBoundingRect && monitor.isOver()) {
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        position = hoverClientY < hoverMiddleY ? 'above' : 'below';
      }
      
      return {
        isOver: monitor.isOver() && monitor.canDrop(),
        dropPosition: position,
      };
    },
  }));

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

  const companyName = opportunity.Companies?.name || `Company ${opportunity.companyId}`;

  // Combine drag and drop refs
  const setRef = (node: HTMLDivElement | null) => {
    if (node) {
      (ref as any).current = node;
      drag(node);
      drop(node);
    }
  };

  return (
    <div className="relative w-full">
      {isOver && dropPosition === 'above' && (
        <div className="w-full h-1 bg-pink-500 rounded-full mb-2" />
      )}
      <div
        ref={setRef}
        className={`flex w-full flex-col items-start gap-2 rounded-md border border-solid transition-all duration-200 relative ${
          isDragging 
            ? 'opacity-50 cursor-grabbing shadow-lg border-neutral-border bg-default-background' 
            : isOver
            ? 'border-pink-500 bg-transparent shadow-md cursor-pointer border-2'
            : 'border-neutral-border bg-default-background cursor-grab hover:shadow-md hover:cursor-pointer'
        } px-4 py-4 shadow-sm`}
        onClick={() => !isDragging && onOpportunityClick(opportunity)}
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
      {isOver && dropPosition === 'below' && (
        <div className="w-full h-1 bg-pink-500 rounded-full mt-2" />
      )}
    </div>
  );
}; 