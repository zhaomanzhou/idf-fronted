import React from 'react';

require('@/assets/logos/iconfont.js'); //将下载文件中的iconfont.js引入

interface IProps {
    type: string;
    size?: number;
}

export default function Icon(props: IProps) {
    return (
        <svg className="icon" aria-hidden="true">
            <use xlinkHref={`#icon-${props.type}`} />
            <style>{`
		.icon {
       		width: 1em; height: 1em;
       		vertical-align: -0.15em;
       		fill: currentColor;
       		overflow: hidden;
       		font-size: ${props.size}em
       	}
	  `}</style>
        </svg>
    );
}
