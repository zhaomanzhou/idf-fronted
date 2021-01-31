import { MenuDataItem, Settings as ProSettings } from '@ant-design/pro-layout';
import { GlobalModelState } from './global';
import { UserModelState } from './user';
import { StateType } from './login';
import { EffectsCommandMap } from 'dva';
import { NoticeListModelType } from '@/pages/notice/list/data';
import { NoticeDetailModelType } from '@/pages/notice/detail/data';

export { GlobalModelState, UserModelState };

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
    publishNotice: PublishNoticeModelType;
    noticeList: NoticeListModelType;
    noticeDetail: NoticeDetailModelType;
}

export interface Route extends MenuDataItem {
    routes?: Route[];
}

export interface DvaAction {
    type: string;
    payload: any;
}

export type Reducer<S = any> = (state: S, action: DvaAction) => S;

export type Effect = (action: DvaAction, effects: EffectsCommandMap) => void;
