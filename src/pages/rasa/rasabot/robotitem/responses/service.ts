import request from '@/utils/request';
import { TableListParams } from './data.d';

export async function queryResponse(params: TableListParams) {
  return request('/api/getresponse', {
    params,
  });
}

export async function removeResponse(params: TableListParams) {
  return request('/api/getresponse', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addResponse(params: TableListParams) {
  return request('/api/getresponse', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateResponse(params: TableListParams) {
  return request('/api/getresponse', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
