import { LockTwoTone, MailTwoTone, MobileTwoTone, GooglePlusOutlined } from '@ant-design/icons';
import { Alert, message, Tabs } from 'antd';
import React, { useState } from 'react';
import ProForm, { ProFormCaptcha, ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
import { connect, Dispatch, Link } from 'umi';
import { getFakeCaptcha, LoginParamsType } from '@/services/login';
import { ConnectState } from '@/models/connect';
import styles from './login.less';
import { StateType } from '@/pages/user/login/data';

interface LoginProps {
    dispatch: Dispatch;
    userLogin: StateType;
    submitting?: boolean;
}

const LoginMessage: React.FC<{
    content: string;
}> = ({ content }) => (
    <Alert
        style={{
            marginBottom: 24,
        }}
        message={content}
        type="error"
        showIcon
    />
);

const Login: React.FC<LoginProps> = (props) => {
    const { userLogin = {}, submitting } = props;
    const { status, type: loginType } = userLogin;
    const [type, setType] = useState<string>('account');

    const handleSubmit = (values: LoginParamsType) => {
        const { dispatch } = props;
        dispatch({
            type: 'login/login',
            payload: { ...values, type },
        });
    };

    return (
        <div className={styles.main}>
            <ProForm
                initialValues={{
                    autoLogin: true,
                }}
                submitter={{
                    searchConfig: {
                        submitText: '登录',
                    },
                    render: (_, dom) => dom.pop(),
                    submitButtonProps: {
                        loading: submitting,
                        size: 'large',
                        style: {
                            width: '100%',
                        },
                    },
                }}
                onFinish={async (values) => {
                    handleSubmit(values);
                }}
            >
                <Tabs activeKey={type} onChange={setType}>
                    <Tabs.TabPane key="account" tab="账户密码登录" />
                    <Tabs.TabPane key="vcode" tab="验证码登录(暂不支持)" />
                </Tabs>

                {status === 'error' && loginType === 'account' && !submitting && (
                    <LoginMessage content="账户或密码错误（admin/ant.design)" />
                )}
                {type === 'account' && (
                    <>
                        <ProFormText
                            name="email"
                            fieldProps={{
                                size: 'large',
                                prefix: <MailTwoTone className={styles.prefixIcon} />,
                            }}
                            placeholder="请输入邮箱"
                            rules={[
                                {
                                    required: true,
                                    message: '邮箱是必填项！',
                                },
                            ]}
                        />
                        <ProFormText.Password
                            name="password"
                            fieldProps={{
                                size: 'large',
                                prefix: <LockTwoTone className={styles.prefixIcon} />,
                            }}
                            placeholder="请输入密码"
                            rules={[
                                {
                                    required: true,
                                    message: '密码是必填项！',
                                },
                            ]}
                        />
                    </>
                )}

                {status === 'error' && loginType === 'mobile' && !submitting && (
                    <LoginMessage content="验证码错误" />
                )}
                {type === 'vcode' && (
                    <>
                        <ProFormText
                            fieldProps={{
                                size: 'large',
                                prefix: <MobileTwoTone className={styles.prefixIcon} />,
                            }}
                            name="mobile"
                            placeholder="邮箱"
                            rules={[
                                {
                                    required: true,
                                    message: '手机号是必填项！',
                                },
                                {
                                    pattern: /^1\d{10}$/,
                                    message: '不合法的手机号！',
                                },
                            ]}
                        />
                        <ProFormCaptcha
                            fieldProps={{
                                size: 'large',
                                prefix: <MailTwoTone className={styles.prefixIcon} />,
                            }}
                            captchaProps={{
                                size: 'large',
                            }}
                            placeholder="请输入验证码"
                            captchaTextRender={(timing, count) =>
                                timing ? `${count}  获取验证码` : '获取验证码'
                            }
                            name="captcha"
                            rules={[
                                {
                                    required: true,
                                    message: '验证码是必填项！',
                                },
                            ]}
                            onGetCaptcha={async (mobile) => {
                                const result = await getFakeCaptcha(mobile);

                                // if (result === false) {
                                //     return;
                                // }

                                message.success('获取验证码成功！验证码为：1234');
                            }}
                        />
                    </>
                )}
                <div
                    style={{
                        marginBottom: 24,
                    }}
                >
                    <ProFormCheckbox noStyle name="autoLogin">
                        自动登录
                    </ProFormCheckbox>
                    <a
                        style={{
                            float: 'right',
                        }}
                    >
                        <Link to="/user/reset-password">忘记密码 ?</Link>
                    </a>
                </div>
            </ProForm>
            <div className={styles.other}>
                其他登录方式
                <GooglePlusOutlined className={styles.icon} />
                <Link className={styles.register} to="/user/register">
                    注册账户
                </Link>
            </div>
        </div>
    );
};

export default connect(({ login, loading }: ConnectState) => ({
    userLogin: login,
    submitting: loading.effects['login/login1'],
}))(Login);
