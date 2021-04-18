import React from 'react';
import ex from 'umi/dist';

export interface Action {
    type: 'hide_new' | 'show_new' | 'hide_modify' | 'show_modify' | 'set_modify';
    payload?: any;
}

export interface BundleContextType {
    newBundleModalVisible: boolean;
    modifyBundleModalVisible: boolean;
    updatingId?: number;
    dispatch: React.Dispatch<Action>;
}

export const initState = {
    newBundleModalVisible: false,
    modifyBundleModalVisible: false,
    dispatch: () => {},
};

export const reducer: React.Reducer<BundleContextType, Action> = (
    state: BundleContextType,
    action: Action,
) => {
    switch (action.type) {
        case 'hide_new':
            return { ...state, newBundleModalVisible: false };
        case 'show_new':
            return { ...state, newBundleModalVisible: true };
        case 'hide_modify':
            return { ...state, modifyBundleModalVisible: false };
        case 'show_modify':
            return { ...state, modifyBundleModalVisible: true };
        case 'set_modify':
            return { ...state, updatingId: action.payload };
        default:
            return state;
    }
};

export const BundleContext = React.createContext<BundleContextType>({
    newBundleModalVisible: false,
    modifyBundleModalVisible: false,
    dispatch: () => {},
});
