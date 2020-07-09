import { AnyAction, Reducer } from 'redux';

import { EffectsCommandMap } from 'dva';
import { ItemData } from './data.d';
import { queryRobotItem } from './service';

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: ItemData) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: ItemData;
  effects: {
    fetchAdvanced: Effect;
  };
  reducers: {
    show: Reducer<ItemData>;
  };
}

const Model: ModelType = {
  namespace: 'RobtItemModel',
  state: {
    robot: {},
  },

  effects: {
    *fetchAdvanced(_, { call, put }) {
      const response = yield call(queryRobotItem);
      yield put({
        type: 'show',
        payload: response,
      });
    },
  },

  reducers: {
    show(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default Model;
