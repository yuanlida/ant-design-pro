export interface RobotItem {
  key?: string;
  robotName?: string;
  machineroom?: string;
  location?: string;
  updatedAt?: string;
  memo?: string;
}

export interface ItemData {
  robot: RobotItem;
}
