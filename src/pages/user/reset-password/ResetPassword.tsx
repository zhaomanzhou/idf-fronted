import { Form, Button, Col, Input, Popover, Progress, Row, message } from 'antd';
import React, { FC, useState, useEffect } from 'react';
import { Link, connect, history, Dispatch } from 'umi';
import { StateType } from './model';
import styles from './ResetPassword.less';
import { GlobalModelState } from '@/models/global';
import service from '@/pages/user/reset-password/service';
import request from '@/utils/request';
import api from '@/utils/api';

const FormItem = Form.Item;
const passwordStatusMap = {
    ok: <div className={styles.success}>强度：强</div>,
    pass: <div className={styles.warning}>强度：中</div>,
    poor: <div className={styles.error}>强度：太短</div>,
};
const passwordProgressMap: {
    ok: 'success';
    pass: 'normal';
    poor: 'exception';
} = {
    ok: 'success',
    pass: 'normal',
    poor: 'exception',
};

interface RegisterProps {
    dispatch: Dispatch;
    userAndregister: StateType;
    submitting: boolean;
}

export interface UserRegisterParams {
    email: string;
    password: string;
    mobile: string;
    vcode: string;
    prefix: string;
}

const ResetPassword: FC<RegisterProps> = () => {
    const [count, setcount]: [number, any] = useState(0);
    const [visible, setvisible]: [boolean, any] = useState(false);
    const [prefix]: [string, any] = useState('86');
    const [popover, setpopover]: [boolean, any] = useState(false);
    const confirmDirty = false;
    let interval: number | undefined;
    const [form] = Form.useForm();

    const [submitting, setSubmitting] = useState<boolean>(false);

    const onGetVcode = async () => {
        let fieldError = form.getFieldError('mail');
        if (fieldError.length > 0) {
            message.error(fieldError);
            return;
        }

        await service.getVcodeForReset(form.getFieldValue('email'));

        message.success('验证码已发送，请注意查收！');

        let counts = 59;
        setcount(counts);
        interval = window.setInterval(() => {
            counts -= 1;
            setcount(counts);

            if (counts === 0) {
                clearInterval(interval);
            }
        }, 1000);
    };

    const getPasswordStatus = () => {
        const value = form.getFieldValue('password');

        if (value && value.length > 9) {
            return 'ok';
        }

        if (value && value.length > 5) {
            return 'pass';
        }

        return 'poor';
    };

    const onFinish = (values: { [key: string]: any }) => {
        request.post(api.user_api.resetPasswordByVcode, values).then((response) => {
            message.success('密码重置成功！');
            message.success('正在跳转到登陆页面！');
            history.push('/user/login');
        });
    };

    const checkConfirm = (_: any, value: string) => {
        const promise = Promise;

        if (value && value !== form.getFieldValue('password')) {
            return promise.reject('两次输入的密码不匹配!');
        }

        return promise.resolve();
    };

    const checkPassword = (_: any, value: string) => {
        const promise = Promise; // 没有值的情况

        if (!value) {
            setvisible(!!value);
            return promise.reject('请输入密码！');
        } // 有值的情况

        if (!visible) {
            setvisible(!!value);
        }

        setpopover(!popover);

        if (value.length < 6) {
            return promise.reject('');
        }

        if (value && confirmDirty) {
            form.validateFields(['confirm']);
        }

        return promise.resolve();
    };

    const renderPasswordProgress = () => {
        const value = form.getFieldValue('password');
        const passwordStatus = getPasswordStatus();
        return value && value.length ? (
            <div className={styles[`progress-${passwordStatus}`]}>
                <Progress
                    status={passwordProgressMap[passwordStatus]}
                    className={styles.progress}
                    strokeWidth={6}
                    percent={value.length * 10 > 100 ? 100 : value.length * 10}
                    showInfo={false}
                />
            </div>
        ) : null;
    };

    return (
        <div className={styles.main}>
            <h3>重置密码</h3>
            <Form form={form} name="ResetPassword" onFinish={onFinish}>
                <FormItem
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: '请输入邮箱地址！',
                        },
                        {
                            type: 'email',
                            message: '邮箱地址格式错误！',
                        },
                    ]}
                >
                    <Input size="large" placeholder="邮箱" />
                </FormItem>

                <Row gutter={8}>
                    <Col span={16}>
                        <FormItem
                            name="vcode"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入验证码！',
                                },
                            ]}
                        >
                            <Input size="large" placeholder="验证码" />
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <Button
                            size="large"
                            disabled={!!count}
                            className={styles.getCaptcha}
                            onClick={onGetVcode}
                        >
                            {count ? `${count} s` : '获取验证码'}
                        </Button>
                    </Col>
                </Row>

                <Popover
                    getPopupContainer={(node) => {
                        if (node && node.parentNode) {
                            return node.parentNode as HTMLElement;
                        }

                        return node;
                    }}
                    content={
                        visible && (
                            <div
                                style={{
                                    padding: '4px 0',
                                }}
                            >
                                {passwordStatusMap[getPasswordStatus()]}
                                {renderPasswordProgress()}
                                <div
                                    style={{
                                        marginTop: 10,
                                    }}
                                >
                                    请至少输入 6 个字符。请不要使用容易被猜到的密码。
                                </div>
                            </div>
                        )
                    }
                    overlayStyle={{
                        width: 240,
                    }}
                    placement="right"
                    visible={visible}
                >
                    <FormItem
                        name="password"
                        className={
                            form.getFieldValue('password') &&
                            form.getFieldValue('password').length > 0 &&
                            styles.password
                        }
                        rules={[
                            {
                                validator: checkPassword,
                            },
                        ]}
                    >
                        <Input size="large" type="password" placeholder="至少6位密码，区分大小写" />
                    </FormItem>
                </Popover>
                <FormItem
                    name="confirm"
                    rules={[
                        {
                            required: true,
                            message: '请确认密码！',
                        },
                        {
                            validator: checkConfirm,
                        },
                    ]}
                >
                    <Input size="large" type="password" placeholder="确认密码" />
                </FormItem>

                <FormItem>
                    <Button
                        size="large"
                        loading={submitting}
                        className={styles.submit}
                        type="primary"
                        htmlType="submit"
                    >
                        重置密码
                    </Button>
                    <Link className={styles.login} to="/user/login">
                        使用已有账户登录
                    </Link>
                </FormItem>
            </Form>
        </div>
    );
};

export default ResetPassword;
