import React from 'react';
import styles from './Title.less';
import { CloudOutlined, MinusOutlined } from '@ant-design/icons';

interface TitleProps {
    content: string;
}

export default (props: TitleProps) => {
    return (
        <div>
            <h1 className={styles.title}>{props.content}</h1>
        </div>
    );
};
