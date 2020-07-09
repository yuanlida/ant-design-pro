import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { message } from 'antd';
import { fakeActionStatus, getAllActions } from './service';
import { TableListData } from './data.d';

export interface StateType {
  data?: TableListData;
  intentsJson?: any;
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    submitActionStatus: Effect;
    getAllActions: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'rasaActions',

  state: {
    data: {
      list: [],
    },
    intentsJson: '',
  },

  effects: {
    *submitActionStatus({ payload }, { call }) {
      yield call(fakeActionStatus, payload);
      message.success('提交成功');
    },
    *getAllActions({ payload, callback }, { call, put }) {
      const response = yield call(getAllActions, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};

export default Model;
