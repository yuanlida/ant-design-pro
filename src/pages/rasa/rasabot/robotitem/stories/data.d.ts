export interface TableListItem {
  key: number;
  storyName?: string;
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
  storyName: string;
  pageSize: number;
  currentPage: number;
}
