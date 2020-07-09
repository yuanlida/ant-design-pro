import request from '@/utils/request';
import { TableListParams } from './data.d';

export async function queryStory(params: TableListParams) {
  return request('/api/story', {
    params,
  });
}

export async function removeStory(params: TableListParams) {
  return request('/api/story', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addStory(params: TableListParams) {
  return request('/api/story', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateStory(params: TableListParams) {
  return request('/api/story', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
