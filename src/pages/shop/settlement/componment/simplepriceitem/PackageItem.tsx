import React, { CSSProperties, Fragment } from 'react';
import './PackageItem.css';
import svg from '../../../../assets/price.svg';
import { BundleItem } from '@/pages/shop/manage/BundleManager';

interface Props {
    bundle: BundleItem;
    style: CSSProperties;
}
const index: React.FC<Props> = ({ bundle }) => {
    const totalDataFragment = (totalData: number) => {
        if (totalData < 1024) {
            return `${totalData}MB`;
        } else if (totalData % 1024 === 0) {
            return `${totalData / 1024}GB`;
        } else {
            return `${(totalData / 1024).toFixed(2)}GB`;
        }
    };

    return (
        <div className="price">
            <ul className="pricing-feature-list">
                <li className="pricing-feature">
                    <span className={'shop-number pricing-feature'}>
                        {totalDataFragment(bundle.totalData)}
                    </span>
                    使用流量
                </li>
                <li className="pricing-feature">
                    {bundle.speed === 0 && '无速率限制'}
                    {bundle.speed !== 0 && (
                        <Fragment>
                            <span className={'shop-number pricing-feature'}>
                                {bundle.speed}Mbps
                            </span>
                            最高速率
                        </Fragment>
                    )}
                </li>
                {/*<li className="pricing-feature">*/}
                {/*    <span className={'shop-number pricing-feature'}>{shop.maxConnection}</span>*/}
                {/*    个最高TCP连接*/}
                {/*</li>*/}
                <li className="pricing-feature">
                    <span className={'shop-number pricing-feature'}>不限设备(禁止共号)</span>
                </li>
                <li className="pricing-feature">
                    <span className={'shop-number pricing-feature'}>V{bundle.level}</span>{' '}
                    及以下的服务器
                </li>
                {bundle.description &&
                    bundle.description.split(',').map((value, index1) => {
                        return (
                            <li className="pricing-feature" key={index1}>
                                <span className={'shop-number pricing-feature'}>{value}</span>
                            </li>
                        );
                    })}
                <li className="pricing-feature">
                    <span className={'shop-number pricing-feature'}>客服支持</span>
                </li>
            </ul>
        </div>
    );
};

export default index;
