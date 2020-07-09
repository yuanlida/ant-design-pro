// 每个robot的基本信息
export interface TableListItem {
  key: number;
  robotName?: string;
  disabled?: boolean;
}

// 分页信息
export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

// 后端返回值后，装配到本地的信息
export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

// 查询参数
export interface TableListParams {
  sorter: string;
  status: string;
  robotName: string;
  pageSize: number;
  currentPage: number;
}
