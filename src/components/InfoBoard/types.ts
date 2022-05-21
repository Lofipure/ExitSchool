export interface IBoardAtomRule {
  label: string;
  field: string;
  isBold?: boolean;
  defaultValue?: string;
}

export interface IBoardProps {
  data: Record<string, any>;
  config: IBoardAtomRule[];
}
