import { EllipsisOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Card, Col, Progress, Radio, Row, Table, Tag, Tooltip } from 'antd';
import React, { useState } from 'react';
import numeral from 'numeral';
import { SearchDataType, VisitDataType } from '../data.d';

import ProList from '@ant-design/pro-list';
import styles from '../style.less';
import { RadioChangeEvent } from 'antd/es/radio';

const data = [
    '问：我按照教程配置完毕后但是还是无法访问外网。\n' +
        '1、请先同步你的系统时间。\n' +
        '2、检查你的游览器是否有代理插件，如果有的话请卸载。\n' +
        '3、然后将软件调成直连模式。\n' +
        '4、重启你的设备，在进行尝试。\n' +
        '备注：如果还是无法访问请先用手机翻墙加入Telegram群组来咨询。手机无法使用的请先用电脑翻墙加入Telegram群组来咨询。',
    '问：我无法更新订阅，请问应该怎么办？\n' +
        '1、请把你的订阅地址复制到游览器看能否打开或下载到TXT文件。\n' +
        '2、如果能打开或下载到TXT文件，那就是系统的问题，请先同步你的系统时间然后将你的软件调整到直连模式并重启你的设备。\n' +
        '3、如果不能打开或下载到TXT文件，那就是网络的问题，先去网站节点列表手动添加一个节点，确定这个节点能用并且连接这个节点开启全局代理模式在进行更新订阅。\n' +
        '备注：如果还是无法更新的请先用手机翻墙加入Telegram群组来咨询，手机无法使用的请先用电脑翻墙加入Telegram群组来咨询。\n',
    'Ant Design',
].map((item) => ({
    title: item,
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/UCSiy1j6jx/xingzhuang.svg',
}));

const TopSearch = ({
    loading,
    visitData2,
    searchData,
    dropdownGroup,
}: {
    loading: boolean;
    visitData2: VisitDataType[];
    dropdownGroup: React.ReactNode;
    searchData: SearchDataType[];
}) => {
    const [articleType, setArticleType] = useState('notice');
    const handleChangeArticleType = (e: RadioChangeEvent) => {
        console.log(e.target.value);
        setArticleType(e.target.value);
    };

    return (
        <Card
            loading={loading}
            bordered={false}
            title={'最新公告'}
            extra={
                <div className={styles.salesCardExtra}>
                    <div>
                        <Radio.Group value={articleType} onChange={handleChangeArticleType}>
                            <Radio.Button value="notice">公告</Radio.Button>
                            <Radio.Button value="instruction">安装教程</Radio.Button>
                        </Radio.Group>
                    </div>
                </div>
            }
            style={{
                height: '100%',
            }}
        >
            <ProList<any>
                metas={{
                    title: {},
                    type: {},
                    avatar: {},
                }}
                dataSource={data}
                renderItem={(item) => item}
            />
        </Card>
    );
};

export default TopSearch;
