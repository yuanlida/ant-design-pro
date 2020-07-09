import request from '@/utils/request';
import { Params } from './data.d';

export async function queryDelayValue(params: Params) {
  return request('/api/delaytime', {
    params,
  });
}

export async function removeDelayValue(params: Params) {
  return request('/api/delaytime', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addDelayValue(params: Params) {
  return request('/api/delaytime', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateDelayValue(params: Params) {
  return request('/api/delaytime', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
