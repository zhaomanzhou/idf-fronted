import React, { useState } from 'react';
import styles from './DataInput.less';
import { Form, Input, Select, Button } from 'antd';

const { Option } = Select;

interface DataValue {
    data?: number;
    dataUnit?: string;
}

interface DataInputProps {
    value?: DataValue;
    dataUnitList: string[];
    onChange?: (value: DataValue) => void;
}
export const DataInput: React.FC<DataInputProps> = ({ value = {}, onChange, dataUnitList }) => {
    const [data, setData] = useState(0);
    const [dataUnit, setDataUnit] = useState<string>(dataUnitList[0]);

    const triggerChange = (changedValue: { data?: number; dataUnit?: string }) => {
        if (onChange) {
            onChange({ data, dataUnit, ...value, ...changedValue });
        }
    };

    const onDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newData = parseInt(e.target.value || '0', 10);
        if (Number.isNaN(newData)) {
            return;
        }
        if (!('data' in value)) {
            setData(newData);
        }
        triggerChange({ data: newData });
    };

    const onDataUnitChange = (newUnit: string) => {
        if (!('dataUnit' in value)) {
            setDataUnit(newUnit);
        }
        triggerChange({ dataUnit: newUnit });
    };

    return (
        <span>
            <Input
                type="text"
                value={value?.data || data}
                onChange={onDataChange}
                style={{ width: 100 }}
            />
            <Select
                value={value?.dataUnit || dataUnit}
                style={{ width: 80, margin: '0 8px' }}
                onChange={onDataUnitChange}
            >
                {dataUnitList.map((value, index) => {
                    return (
                        <Option value={value} key={index}>
                            {value}
                        </Option>
                    );
                })}
            </Select>
        </span>
    );
};
