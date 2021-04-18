import React, { useEffect, useState } from 'react';
import styles from './Pay.less';
import { PageContainer, PageLoading } from '@ant-design/pro-layout';
import { history } from '@@/core/history';
import { PayInfo } from '@/pages/order/service';
import { Card, message } from 'antd';
import { Meta } from 'antd/es/list/Item';
import QRCode from 'qrcode.react';
import service from '@/pages/shop/pay/service';

export default () => {
    const [payInfo, setPayInfo] = useState<PayInfo>();

    useEffect(() => {
        let pathName = history.location.pathname;
        const pathPrefix = '/shop/pay/';
        let id = pathName.substring(pathName.indexOf(pathPrefix) + pathPrefix.length);
        if (id === null || id === '') {
            history.push('/order/my/list');
            return;
        }

        service
            .getPayInfo(id)
            .then((res) => {
                // @ts-ignore
                setPayInfo(res);
            })
            .catch((err) => {
                history.push('/order/my/list');
                return;
            });
    }, []);

    useEffect(() => {
        let pathName = history.location.pathname;
        const pathPrefix = '/shop/pay/';
        let orderId = pathName.substring(pathName.indexOf(pathPrefix) + pathPrefix.length);
        let time = 0;
        let id = setInterval(() => {
            time++;
            if (time === 20) {
                clearInterval(id);
            }
            service
                .checkIsPaid(orderId)
                .then((res) => {
                    if (res) {
                        message.success('支付成功，正在跳转到我的订单');
                        clearInterval(id);
                        history.push('/order/my/list');
                        return;
                    }
                    console.log(res);
                })
                .catch((err) => {
                    clearInterval(id);
                });
        }, 5000);
        return () => {
            clearInterval(id);
        };
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
