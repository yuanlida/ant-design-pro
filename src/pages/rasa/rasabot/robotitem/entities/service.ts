import request from '@/utils/request';
import { TableListParams } from './data.d';

export async function queryEntities(params: TableListParams) {
  return request('/api/entitis', {
    params,
  });
}

export async function removeEntities(params: TableListParams) {
  return request('/api/entitis', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addEntities(params: TableListParams) {
  return request('/api/entitis', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateEntities(params: TableListParams) {
  return request('/api/entitis', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
