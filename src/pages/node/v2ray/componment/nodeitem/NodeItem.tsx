import React from 'react';
import './NodeItem.less';

interface NodeItemProps {
    label: string;
    value: any;
}

export default (props: NodeItemProps) => {
    return (
        <div>
            <label id="label11">{props.label}:</label>
            {props.value}
        </div>
    );
};
