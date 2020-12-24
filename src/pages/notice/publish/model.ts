import { Effect, Reducer } from 'umi';
import service from "@/pages/notice/publish/service";
import {message} from "antd";


export interface StateType {
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    publish: Effect;
  };
  reducers: {
  };
}

const Model: ModelType = {
  namespace: 'publishNotice',

  state: {
    list: [],
  },

  effects: {


      *publish({payload}, effect){
          console.log(payload)
          yield effect.call(service.publishNotice, payload);
          message.success("发布成功")
      }

  },



  reducers: {},
};

export default Model;
