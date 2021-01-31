import React, { Fragment } from 'react';
import styles from './Item.less';

interface PeriodChoiceProps {
    content: React.ReactNode;
    chosen: boolean;
    onClick: () => void;
}

export default (props: PeriodChoiceProps) => {
    const style = props.chosen ? styles.title + ' ' + styles.active : styles.title;

    return (
        <Fragment>
            <div className={style} onClick={props.onClick}>
                {props.content}
            </div>
        </Fragment>
    );
};
