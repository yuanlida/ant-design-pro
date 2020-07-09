import request from '@/utils/request';
import { TableListParams } from './data.d';

export async function fakeSubmitForm(params: any) {
  return request('/api/getforms', {
    method: 'POST',
    data: params,
  });
}

export async function getIntentsJson(params: TableListParams) {
  return request('/api/getintentsjson', {
    method: 'GET',
    data: params,
  });
}

export async function getAllExpressions(params: TableListParams) {
  return request('/api/getallexpressons', {
    method: 'GET',
    data: params,
  });
}
