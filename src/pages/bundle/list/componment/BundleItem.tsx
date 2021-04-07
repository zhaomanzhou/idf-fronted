import React, { Fragment } from 'react';
import './BundleItem.css';
import svg from '../../../../assets/price.svg';
import { BundleItem } from '@/pages/bundle/manage/BundleManager';
import { history } from 'umi';

interface Props {
    bundle: BundleItem;
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

    const subscriptionBtnClick = () => {
        history.push('/bundle/shop/settlement/' + bundle.id);
    };

    return (
        <div className="pricing pricing-palden">
            <div className="pricing-item pricing__item--featured">
                <div className="pricing-deco">
                    <img src={svg} className="pricing-deco-img" />

                    <div className="pricing-price">
                        <span className="pricing-currency">¥</span>
                        {bundle.price / 100.0}
                        <span className="pricing-period">/月</span>
                    </div>
                    <h3 className="pricing-title">基础版</h3>
                </div>
                <ul className="pricing-feature-list">
                    <li className="pricing-feature">
                        <span className={'bundle-number pricing-feature'}>
                            {totalDataFragment(bundle.totalData)}
                        </span>
                        使用流量
                    </li>
                    <li className="pricing-feature">
                        {bundle.speed === 0 && '无速率限制'}
                        {bundle.speed !== 0 && (
                            <Fragment>
                                <span className={'bundle-number pricing-feature'}>
                                    {bundle.speed}Mbps
                                </span>
                                最高速率
                            </Fragment>
                        )}
                    </li>
                    <li className="pricing-feature">
                        {/*<span className={'bundle-number pricing-feature'}>*/}
                        {/*    {bundle.maxConnection}*/}
                        {/*</span>*/}
                        不限个人设备(共号封禁)
                    </li>
                    <li className="pricing-feature">
                        <span className={'bundle-number pricing-feature'}>V{bundle.level}</span>{' '}
                        及以下的服务器
                    </li>

                    {bundle.description &&
                        bundle.description.split(',').map((value, index1) => {
                            return (
                                <li className="pricing-feature" key={index1}>
                                    <span className={'bundle-number pricing-feature'}>{value}</span>
                                </li>
                            );
                        })}

                    <li className="pricing-feature">
                        <span className={'bundle-number pricing-feature'}>客服支持</span>
                    </li>
                </ul>
                <button className="pricing-action" onClick={subscriptionBtnClick}>
                    立即订阅
                </button>
            </div>
        </div>
    );
};

export default index;
