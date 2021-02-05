import React, { useEffect, useState } from 'react';
import styles from './Pay.less';
import { PageContainer, PageLoading } from '@ant-design/pro-layout';
import { history } from '@@/core/history';
import service, { PayInfo } from '@/pages/order/service';
import { Card } from 'antd';
import { Meta } from 'antd/es/list/Item';
import QRCode from 'qrcode.react';

export default () => {
    const [payInfo, setPayInfo] = useState<PayInfo>();

    useEffect(() => {
        let pathName = history.location.pathname;
        const pathPrefix = '/bundle/pay/';
        let id = pathName.substring(pathName.indexOf(pathPrefix) + pathPrefix.length);
        if (id === null || id === '') {
            // history.push('/');
            return;
        }

        service.getPayInfo(id).then((res) => {
            // @ts-ignore
            setPayInfo(res);
            console.log(res);
        });
    }, []);

    if (payInfo === null || payInfo === undefined) {
        return <PageLoading />;
    }
    return (
        <PageContainer title={'订单结算'}>
            <div className={styles.card}>
                <p className={styles.price}> {'应付金额 ' + payInfo.totalMoney * 0.01 + '元'}</p>
                <QRCode
                    value={payInfo.payLink} // 需要生成二维码图片的url地址
                    size={300} // 二维码图片大小
                    fgColor="#000000" // 二维码图片背景色
                    className={styles.qr}
                />
                <p className={styles.info}> {'打开支付宝 扫描二维码进行支付'}</p>
            </div>
        </PageContainer>
    );
};
