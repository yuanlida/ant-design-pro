const robot = {
  key: 'op1',
  robotName: 'robotName',
  machineroom: 'machineroom',
  location: 'location',
  updatedAt: '2017-10-03  19:23:12',
  memo: '-',
};

const getRobotItem = {
  robot,
};

export default {
  'GET  /api/getrobotitem': getRobotItem,
};
