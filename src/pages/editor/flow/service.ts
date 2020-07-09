import request from '@/utils/request';
import { Param } from './data.d';

export async function queryFlowChat(params: Param) {
  return request('/api/flowchart', {
    params,
  });
}

export async function removeFlowChat(params: Param) {
  return request('/api/flowchart', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addFlowChat(params: Param) {
  return request('/api/flowchart', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateFlowChat(params: Param) {
  return request('/api/flowchart', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
