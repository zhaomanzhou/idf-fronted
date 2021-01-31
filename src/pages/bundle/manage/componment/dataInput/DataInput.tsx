import React, { useState } from 'react';
import styles from './DataInput.less';
import { Form, Input, Select, Button } from 'antd';

const { Option } = Select;

type DataUnit = 'MB' | 'GB';

interface DataValue {
    data?: number;
    dataUnit?: DataUnit;
}

interface DataInputProps {
    value?: DataValue;
    onChange?: (value: DataValue) => void;
}
export const DataInput: React.FC<DataInputProps> = ({ value = {}, onChange }) => {
    const [data, setData] = useState(0);
    const [dataUnit, setDataUnit] = useState<DataUnit>('GB');

    const triggerChange = (changedValue: { data?: number; dataUnit?: DataUnit }) => {
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

    const onDataUnitChange = (newUnit: DataUnit) => {
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
                <Option value="MB">MB</Option>
                <Option value="GB">GB</Option>
            </Select>
        </span>
    );
};
