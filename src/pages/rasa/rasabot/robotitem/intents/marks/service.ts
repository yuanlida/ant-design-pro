import request from '@/utils/request';
import { TableListParams } from './data.d';

export async function queryMarks(params: TableListParams) {
  return request('/api/marks', {
    params,
  });
}

export async function removeMarks(params: TableListParams) {
  return request('/api/marks', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addMarks(params: TableListParams) {
  return request('/api/marks', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateMarks(params: TableListParams) {
  return request('/api/marks', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
