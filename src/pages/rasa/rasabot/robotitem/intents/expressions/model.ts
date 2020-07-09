import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { message } from 'antd';
import { fakeSubmitForm, getAllExpressions, getIntentsJson } from './service';
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
    submitAdvancedForm: Effect;
    getIntentsJson: Effect;
    getAllExpressions: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
    saveJson: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'intentExpressions',

  state: {
    data: {
      list: [],
    },
    intentsJson: '',
  },

  effects: {
    *submitAdvancedForm({ payload }, { call }) {
      yield call(fakeSubmitForm, payload);
      message.success('提交成功');
    },
    *getIntentsJson({ payload, callback }, { call, put }) {
      const response = yield call(getIntentsJson, payload);
      yield put({
        type: 'saveJson',
        payload: response,
      });
      if (callback) callback();
    },
    *getAllExpressions({ payload, callback }, { call, put }) {
      const response = yield call(getAllExpressions, payload);
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
    saveJson(state, action) {
      return {
        ...state,
        intentsJson: action.payload,
      };
    },
  },
};

export default Model;
