export const ItemType = {
  OPPORTUNITY: 'opportunity',
} as const;

export interface DragItem {
  id: number;
  status: string;
  opportunity: any; // Using any to avoid circular dependencies with OpportunityWithId
} 