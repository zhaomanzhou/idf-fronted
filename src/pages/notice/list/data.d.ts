import {Effect, Reducer} from "@/models/connect";
import {Subscription} from "@@/plugin-dva/connect";

interface Notice {
    id:number;
    title: string;
    contentMarkdown: string;
    contentHtml: string;
    noticeType: number;
    stick: boolean;
    orderValue: number;
    updateTime: string;
    createTime: string;
}


export interface StateType {
    NotificationList: Notice[];
}

export interface NoticeListModelType {
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


