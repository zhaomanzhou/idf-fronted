import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';
import React from 'react';
import { history, ConnectProps, connect } from 'umi';
import { ConnectState } from '@/models/connect';
import { CurrentUser } from '@/models/user';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import {UserVo} from "@/pages/user/login/data";

export interface GlobalHeaderRightProps extends Partial<ConnectProps> {
    currentUser?: UserVo | null;
    menu?: boolean;
}

class AvatarDropdown extends React.Component<GlobalHeaderRightProps> {
  onMenuClick = (event: {
    key: React.Key;
    keyPath: React.Key[];
    item: React.ReactInstance;
    domEvent: React.MouseEvent<HTMLElement>;
  }) => {
    const { key } = event;

    if (key === 'logout') {
      const { dispatch } = this.props;

      if (dispatch) {
        dispatch({
          type: 'login/logout',
        });
      }

      return;
    }

    history.push(`/account/${key}`);
  };

  render(): React.ReactNode {
    const {
      // currentUser = {
      //     avatarUrl: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      //     nickname: '',
      // },
      menu,
    } = this.props;

      const currentUser:{avatarUrl: string,nickname:string } = {
              avatarUrl: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
              nickname: '',
          };

    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        {menu && (
          <Menu.Item key="center">
            <UserOutlined />
            个人中心
          </Menu.Item>
        )}
        {menu && (
          <Menu.Item key="settings">
            <SettingOutlined />
            个人设置
          </Menu.Item>
        )}
        {menu && <Menu.Divider />}

        <Menu.Item key="logout">
          <LogoutOutlined />
          退出登录
        </Menu.Item>
      </Menu>
    );
    return currentUser  ? (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar size="small" className={styles.avatar} src={currentUser.avatarUrl} alt="avatar" />
          <span className={`${styles.name} anticon`}>{currentUser.nickname}</span>
        </span>
      </HeaderDropdown>
    ) : (
      <span className={`${styles.action} ${styles.account}`}>
        <Spin
          size="small"
          style={{
            marginLeft: 8,
            marginRight: 8,
          }}
        />
      </span>
    );
  }
}

export default connect(({ global }: ConnectState) => ({
  currentUser: global.user,
}))(AvatarDropdown);
