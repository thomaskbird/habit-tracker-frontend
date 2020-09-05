export interface Timestamps {
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export enum TrackerType {
  simple = 'simple',
  simpleComplex = 'simple-complex',
}

export interface TrackerSimpleItem extends Timestamps {
  id: number;
  tracker_id: number;
  amount: number;
}

export interface TrackerComplexItem extends TrackerSimpleItem, Timestamps {
  hours: number;
}

export interface ChartData {
  id: string;
  label: string;
  count: number;
}

export interface Tracker extends Timestamps {
  id: number;
  user_id: number;
  name: string;
  description?: string;
  type: TrackerType;
  tracker_items: TrackerSimpleItem[] | TrackerComplexItem[];
  chart_data: ChartData[];
}

export interface AppError {
  error: boolean;
  type: string;
  msgs: string[];
}
