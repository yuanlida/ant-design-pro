import request from 'umi-request';

export async function queryRobotItem() {
  return request('/api/getrobotitem');
}
