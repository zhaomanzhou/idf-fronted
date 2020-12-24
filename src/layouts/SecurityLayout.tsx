import React from 'react';
import {PageLoading} from '@ant-design/pro-layout';
import {Redirect, connect, ConnectProps} from 'umi';
import {stringify} from 'querystring';
import {ConnectState} from '@/models/connect';
import {UserVo} from "@/pages/user/login/data";

interface SecurityLayoutProps extends ConnectProps {
    loading?: boolean;
    user: UserVo | null;
}

interface SecurityLayoutState {
    isReady: boolean;
}

class SecurityLayout extends React.Component<SecurityLayoutProps, SecurityLayoutState> {
    state: SecurityLayoutState = {
        isReady: false,
    };

    componentDidMount() {
        this.setState({
            isReady: true,
        });
        const {dispatch} = this.props;
        if (dispatch) {
            dispatch({
                type: 'global/initUserFromLocalStorage',
            });
        }
    }

    render() {
        const {isReady} = this.state;
        const {children, loading, user} = this.props;
        // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）
        const isLogin = user && user.id;
        // const isLogin = true;
        const queryString = stringify({
            redirect: window.location.href,
        });

        if ((!isLogin && loading) || !isReady) {
            return <PageLoading/>;
        }
        if (!isLogin && window.location.pathname !== '/user/login') {
            console.log("redirect")
            console.log("-------")
            return <Redirect to={`/user/login?${queryString}`}/>;
        }
        return children;
    }
}


const mapStateToProps = (state: ConnectState) => {
    return {
        user: state.global.user,
        loading: state.loading.models.global,
    }
}


export default connect(mapStateToProps)(SecurityLayout)
