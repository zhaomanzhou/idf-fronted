import {MenuDataItem, Settings as ProSettings} from '@ant-design/pro-layout';
import {GlobalModelState} from './global';
import {UserModelState} from './user';
import {StateType} from './login';
import {AnyAction} from "redux";
import {EffectsCommandMap} from "dva";
import {Action} from "@@/plugin-dva/connect";
import {NoticeListModelType} from "@/pages/notice/list/data";


export {GlobalModelState, UserModelState};

export interface Loading {
    global: boolean;
    effects: { [key: string]: boolean | undefined };
    models: {
        global?: boolean;
        menu?: boolean;
        setting?: boolean;
        user?: boolean;
        login?: boolean;
    };
}

export interface ConnectState {
    global: GlobalModelState;
    loading: Loading;
    settings: ProSettings;
    user: UserModelState;
    login: StateType;
    noticeList: NoticeListModelType;
}

export interface Route extends MenuDataItem {
    routes?: Route[];
}


export interface DvaAction {
    type: string,
    payload: any
}

export type Reducer<S = any> = (
    state: S,
    action: DvaAction
) => S;


export type Effect = (
    action: DvaAction,
    effects: EffectsCommandMap,
) => void;
