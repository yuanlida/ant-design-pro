import request from '@/utils/request';
import { TableListParams } from './data.d';

export async function queryIntents(params: TableListParams) {
  return request('/api/intents', {
    params,
  });
}

export async function removeIntents(params: TableListParams) {
  return request('/api/intents', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addIntents(params: TableListParams) {
  return request('/api/intents', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateIntents(params: TableListParams) {
  return request('/api/intents', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
