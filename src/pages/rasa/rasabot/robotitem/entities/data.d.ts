// 每个entity的信息
export interface TableListItem {
  key: number;
  robotId?: number;
  entityName?: string;
  slotDataType?: string;
  disabled?: boolean;
}

// 分页
export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

// 从后端返回的值，进行组装。
export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

// 查询功能。
export interface TableListParams {
  entityName: string;
  robotId: number;
  pageSize: number;
  currentPage: number;
}
