import React from 'react';
import styles from './ResultSub.less';

interface ResultSubProps {
    label: string;
    value: string;
    bigger?: boolean;
}

export default (props: ResultSubProps) => {
    return (
        <div className={styles.main}>
            <p className={[styles.label, props.bigger ? styles.bigLabel : null].join(' ')}>
                {props.label}
            </p>
            <h1 className={[styles.value, props.bigger ? styles.bigValue : null].join(' ')}>
                {props.value}
            </h1>
        </div>
    );
};
