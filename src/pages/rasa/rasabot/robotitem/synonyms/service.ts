import request from '@/utils/request';
import { TableListParams } from './data.d';

export async function querySynonyms(params: TableListParams) {
  return request('/api/synonyms', {
    params,
  });
}

export async function removeSynonyms(params: TableListParams) {
  return request('/api/synonyms', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addSynonyms(params: TableListParams) {
  return request('/api/synonyms', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateSynonyms(params: TableListParams) {
  return request('/api/synonyms', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
