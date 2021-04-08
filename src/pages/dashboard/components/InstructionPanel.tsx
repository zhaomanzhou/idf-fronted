import { Card } from 'antd';

import React, { useEffect, useState } from 'react';

import { AndroidFilled, AppleFilled, WindowsFilled } from '@ant-design/icons';
import { Meta } from 'antd/es/list/Item';
import '@/assets/logos/iconfont.css';
import '../style.less';
import api from '@/utils/api';
import request from '@/utils/request';
import { Link } from 'umi';

const InstructionPanel = () => {
    const [preferenceObject, setPreferenceObject] = useState<any>({
        INSTRUCTION_LINK_ANDROID: '11',
        INSTRUCTION_LINK_IOS: '',
        INSTRUCTION_LINK_MAC: '',
        INSTRUCTION_LINK_WINDOWS: '',
        INSTRUCTION_LINK_LINUX: '',
        INSTRUCTION_LINK_UPDATE_SUBSCRIPTION: '',
    });

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        request
            .get(api.user_api.getInstructionPreferences, {})

            .then((response) => {
                // @ts-ignore
                for (const preference of response) {
                    preferenceObject[preference.preKey] = preference.preValue;
                }
                setLoading(false);
            });
    }, []);

    return (
        <Card loading={loading} bordered={false} title={'安装教程'}>
            <Card.Grid>
                <a href={preferenceObject.INSTRUCTION_LINK_ANDROID} target={'_blank'}>
                    <Card bodyStyle={{ padding: 0, textAlign: 'center' }} bordered={false}>
                        <AndroidFilled style={{ fontSize: 38, color: '#1890ff' }} />
                        <Meta title={'Android'} />
                    </Card>
                </a>
            </Card.Grid>

            <Card.Grid>
                <a href={preferenceObject.INSTRUCTION_LINK_IOS} target={'_blank'}>
                    <Card bodyStyle={{ padding: 0, textAlign: 'center' }} bordered={false}>
                        <AppleFilled style={{ fontSize: 38, color: '#1890ff' }} />
                        <Meta title={'IOS'} />
                    </Card>
                </a>
            </Card.Grid>

            <Card.Grid>
                <a href={preferenceObject.INSTRUCTION_LINK_WINDOWS} target={'_blank'}>
                    <Card
                        bodyStyle={{ padding: 0, textAlign: 'center', borderWidth: 20 }}
                        bordered={false}
                    >
                        <WindowsFilled style={{ fontSize: 38, color: '#1890ff' }} />
                        <Meta title={'Windows'} />
                    </Card>
                </a>
            </Card.Grid>

            <Card.Grid>
                <a href={preferenceObject.INSTRUCTION_LINK_MAC} target={'_blank'}>
                    <Card bodyStyle={{ padding: 0, textAlign: 'center' }} bordered={false}>
                        <AppleFilled style={{ fontSize: 38, color: '#1890ff' }} />
                        <Meta title={'MacOS'} />
                    </Card>
                </a>
            </Card.Grid>
            <Card.Grid>
                <a href={preferenceObject.INSTRUCTION_LINK_LINUX} target={'_blank'}>
                    <Card bodyStyle={{ padding: 0, textAlign: 'center' }} bordered={false}>
                        {/*<DesktopOutlined  style={{ fontSize: 38 }} />*/}
                        <span
                            className="iconfont icon-linux linuxIcon"
                            style={{ fontSize: 38, color: '#1890ff' }}
                        />
                        <Meta title={'Linux'} />
                    </Card>
                </a>
            </Card.Grid>
            <Card.Grid>
                <a href={preferenceObject.INSTRUCTION_LINK_UPDATE_SUBSCRIPTION} target={'_blank'}>
                    <Card bodyStyle={{ padding: 0, textAlign: 'center' }} bordered={false}>
                        <span
                            className="iconfont icon-sync linuxIcon"
                            style={{ fontSize: 38, color: '#1890ff' }}
                        />
                        <Meta title={'如何更新订阅'} />
                    </Card>
                </a>
            </Card.Grid>
        </Card>
    );
};

export default InstructionPanel;
