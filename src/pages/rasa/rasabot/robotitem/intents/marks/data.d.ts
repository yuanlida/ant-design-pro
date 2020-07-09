export interface TableListItem {
  key: number;
  robotId?: number;
  expressId?: number;
  markEntity?: string;
  markContent?: string;
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
  markContent: string;
  markEntity: string;
  robotId: number;
  pageSize: number;
  currentPage: number;
}
