export interface Timestamps {
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export enum TrackerType {
  simple = 'simple',
  simpleComplex = 'simple-complex',
}

export interface TrackerItem extends Timestamps {
  id: number;
  tracker_id: number;
  amount: number;
}

export interface Tracker extends Timestamps {
  id: number;
  user_id: number;
  name: string;
  description?: string;
  type: TrackerType;
  tracker_items: TrackerItem[];
}

export interface AppError {
  error: boolean;
  type: string;
  msgs: string[];
}
