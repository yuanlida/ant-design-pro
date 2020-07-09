export type IntentJson = any;

export interface TableListItem {
  key: number;
  type?: string;
  expression?: string;
}

export interface TableListData {
  list: TableListItem[];
}

export interface TableListParams {
  intentId?: number;
}

export interface jsonData {
  jsonData: any;
}
