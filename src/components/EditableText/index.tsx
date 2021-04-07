import { Button, Input, Modal, Result, Spin } from 'antd';
import React, { Fragment, memo, useMemo, useRef, useState } from 'react';
import {
    CheckCircleFilled,
    CheckCircleOutlined,
    CloseCircleFilled,
    CloseCircleOutlined,
    EditOutlined,
} from '@ant-design/icons';
import styles from './index.less';

export interface EditTextProps {
    initialValue: string;
    onSubmitEdit: (string) => void;
}

const EditableText = (props: EditTextProps) => {
    const [toggle, setToggle] = useState<boolean>(false);
    const [content, setContent] = useState<string>(props.initialValue);
    const [prevContent, setPrevContent] = useState<string>(props.initialValue);
    const inputRef = useRef<any>(null);

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
            <span
                style={{ textAlign: 'center' }}
                onBlur={(e) => {
                    e.preventDefault();
                    // if(toggle) {
                    //     cancelModify();
                    // }
                }}
                hidden={!toggle}
            >
                <Input
                    ref={inputRef}
                    size="small"
                    placeholder="Basic usage"
                    className={styles.input}
                    value={content}
                    onChange={(e) => {
                        setContent(e.target.value);
                    }}
                />
                &nbsp;
                <CheckCircleOutlined
                    className={styles.editIcon}
                    style={{ color: '#1890ff', fontSize: 15 }}
                    onClick={() => {
                        submitModify();
                    }}
                />
                &nbsp;
                <CloseCircleOutlined
                    className={styles.editIcon}
                    style={{ color: '#f37777', fontSize: 15 }}
                    onClick={() => {
                        cancelModify();
                    }}
                />
            </span>

            <span style={{ textAlign: 'center' }} hidden={toggle}>
                {content}

                <span
                    onClick={() => {
                        setToggle(!toggle);
                        setPrevContent(content);
                        setTimeout(() => {
                            inputRef.current!.focus();
                        }, 500);
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

export default memo(EditableText);
