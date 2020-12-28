import React, { useEffect, Fragment } from 'react';
import { ConnectState } from '@/models/connect';
import { connect } from '@@/plugin-dva/exports';
import { Dispatch } from '@@/plugin-dva/connect';
import { History } from 'history';
import { StateType } from '@/pages/notice/detail/data';

import './detail.less';
import { PageLoading } from '@ant-design/pro-layout';
import { Link } from 'umi';
export interface NoticeDetailProps {
    noticeDetail: StateType;
    dispatch: Dispatch;
    history: History;
    loading: boolean;
}

const index = (props) => {
    const { noticeDetail, dispatch, history, loading }: NoticeDetailProps = props;

    useEffect(() => {
        const init = async () => {
            await dispatch({
                type: 'global/initUserFromLocalStorage',
            });
            let pathName = history.location.pathname;
            const pathPrefix = '/notice/detail/';
            let id = pathName.substring(pathName.indexOf(pathPrefix) + pathPrefix.length);
            if (id === null || id === '') {
                history.push('/notice/list');
                return;
            }
            dispatch({
                type: 'noticeDetail/getNotification',
                payload: id,
            });
        };

        init().then();
    }, []);

    let content = { __html: noticeDetail.notification && noticeDetail.notification.contentHtml };
    // let content = {string: noticeDetail.notification && noticeDetail.notification.contentHtml}

    if (loading) {
        return <PageLoading />;
    }

    return (
        <Fragment>
            <section className="page-header">
                <Link to={'/notice/list'} style={{ textDecoration: 'none' }}>
                    <h1 className="project-name">
                        {noticeDetail.notification && noticeDetail.notification.title}
                    </h1>
                </Link>
            </section>

            <section className="main-content">
                <div dangerouslySetInnerHTML={content} />
            </section>
        </Fragment>
    );
};

const mapStateToProps = (state: ConnectState) => {
    return {
        noticeDetail: state.noticeDetail,
        loading: state.loading.effects['global/initUserFromLocalStorage'],
    };
};

export default connect(mapStateToProps)(index);
