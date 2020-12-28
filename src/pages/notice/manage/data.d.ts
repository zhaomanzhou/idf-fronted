import { Effect, Reducer } from '@/models/connect';
import { Subscription } from '@@/plugin-dva/connect';

export interface Notice {
    id: number;
    title: string;
    contentMarkdown: string;
    contentHtml: string;
    noticeType: number;
    stick: boolean;
    orderValue: number;
    publisherId: number;
    status: number;
    visibility: number;
    updateTime: string;
    createTime: string;
}

export interface StateType {
    NotificationList: Notice[];
}

export interface NoticeManageModelType {
    namespace: string;
    state: StateType;
    effects: {
        [propName: string]: Effect;
    };
    reducers: {
        [propName: string]: Reducer<StateType>;
    };
    subscriptions: {
        [propName: string]: Subscription;
    };
}
