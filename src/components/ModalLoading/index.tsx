import { Button, Modal, Result, Spin } from 'antd';
import React, { Fragment } from 'react';
import styles from '@/pages/bundle/settlement/Settlement.less';

export interface ModalLoadingProps {
    title: string;
    tip: string;
    visible: boolean;
}

const ModalLoading = (props: ModalLoadingProps) => {
    return (
        <Modal title={props.title} visible={props.visible} footer={null}>
            <Fragment>
                <Spin tip={props.tip} size={'large'} className={styles.loading} />
            </Fragment>
        </Modal>
    );
};

ModalLoading.defaultProps = {
    title: '加载中',
    tip: '加载中...',
    visible: false,
};

export default ModalLoading;
