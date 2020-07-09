export interface TableListItem {
  key: number;
  robotId?: number;
  responseName?: string;
  disabled?: boolean;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  responseName: string;
  robotId: number;
  pageSize: number;
  currentPage: number;
}
