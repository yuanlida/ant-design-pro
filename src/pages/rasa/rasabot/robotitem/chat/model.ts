import { Message } from "./data.d";
import { AnyAction, Reducer } from "redux";
import { EffectsCommandMap } from "dva";
import { addItem, queryItem, removeItem, updateItem } from "./service";

export interface StateType {
  data: Message;
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & {
    select: <T>(func: (state: StateType) => T) => T;
  }
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetch: Effect;
    add: Effect;
    remove: Effect;
    update: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: "robotItemChat",
  state: {
    data: {
      id: "",
      message: "",
      type: ""
    }
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryItem, payload);
      yield put({
        type: "save",
        payload: response
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addItem, payload);
      yield put({
        type: "save",
        payload: response
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeItem, payload);
      yield put({
        type: "save",
        payload: response
      });
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateItem, payload);
      yield put({
        type: "save",
        payload: response
      });
      if (callback) callback();
    }
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload
      };
    }
  }
};

export default Model;
