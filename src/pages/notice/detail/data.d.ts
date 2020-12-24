import {Effect, Reducer} from "@/models/connect";
import {Subscription} from "@@/plugin-dva/connect";




export interface StateType {
    notification: Notice | null;
}

export interface NoticeDetailModelType {
    namespace: string;
    state: StateType;
    effects: {
        [propName: string]: Effect;
    };
    reducers: {
        [propName: string]: Reducer<StateType>;
    };
    subscriptions:{
        [propName: string]: Subscription;
    }
}


