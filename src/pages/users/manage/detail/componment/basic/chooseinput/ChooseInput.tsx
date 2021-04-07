import { Button, Input, Modal, Result, Select, Spin, Tag } from 'antd';
import React, { Fragment, memo, useEffect, useMemo, useRef, useState } from 'react';
import {
    CheckCircleFilled,
    CheckCircleOutlined,
    CloseCircleFilled,
    CloseCircleOutlined,
    EditOutlined,
} from '@ant-design/icons';
import styles from './ChooseInput.less';
import api from '@/utils/api';
import request from '@/utils/request';

export interface EditTextProps {
    initialValue: string[];
    onSubmitEdit: (string) => void;
}

const { Option } = Select;

const ChooseInput = (props: EditTextProps) => {
    const [toggle, setToggle] = useState<boolean>(false);
    const [content, setContent] = useState<string[]>(props.initialValue);
    const [prevContent, setPrevContent] = useState<string[]>(props.initialValue);

    const [devices, setDevices] = useState<string[]>([]);

    useEffect(() => {
        request.get(api.user_api.getDeviceList, {}).then((res) => {
            // @ts-ignore
            setDevices(res);
        });
    }, []);

    const submitModify = () => {
        setToggle(!toggle);
        props.onSubmitEdit(content);
    };

    const cancelModify = () => {
        setContent(prevContent);
        setToggle(!toggle);
    };
    let i = 0;

    // @ts-ignore
    return (
        <Fragment>
            <span hidden={!toggle} style={{ width: '100%' }}>
                <Select
                    mode="multiple"
                    allowClear
                    style={{ width: '85%' }}
                    placeholder="Please select"
                    defaultValue={props.initialValue}
                    onChange={(val) => {
                        setContent(val);
                    }}
                >
                    {devices.map((i, index) => {
                        return (
                            <Option value={i} key={i}>
                                {i}
                            </Option>
                        );
                    })}
                </Select>
                &nbsp;
                <CheckCircleOutlined
                    className={styles.editIcon}
                    style={{ color: '#1890ff', fontSize: 20 }}
                    onClick={() => {
                        submitModify();
                    }}
                />
                &nbsp;
                <CloseCircleOutlined
                    className={styles.editIcon}
                    style={{ color: '#f37777', fontSize: 20 }}
                    onClick={() => {
                        cancelModify();
                    }}
                />
            </span>

            <span style={{ textAlign: 'center' }} hidden={toggle}>
                {content.map((i, index) => {
                    return (
                        <Tag color="red" key={index}>
                            {i}
                        </Tag>
                    );
                })}

                <span
                    onClick={() => {
                        setToggle(!toggle);
                        setPrevContent(content);
                    }}
                    className={styles.editIcon}
                >
                    &nbsp;
                    <EditOutlined />
                </span>
            </span>
        </Fragment>
    );
};

export default memo(ChooseInput);
