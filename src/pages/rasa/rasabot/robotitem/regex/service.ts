import request from '@/utils/request';
import { TableListParams } from './data.d';

export async function queryRegex(params: TableListParams) {
  return request('/api/regex', {
    params,
  });
}

export async function removeRegex(params: TableListParams) {
  return request('/api/regex', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRegex(params: TableListParams) {
  return request('/api/regex', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRegex(params: TableListParams) {
  return request('/api/regex', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
