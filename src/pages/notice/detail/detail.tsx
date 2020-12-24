import React from 'react';
import styles from './detail.less';
import {Typography} from "antd";
import Title from "antd/lib/typography/Title";
import Paragraph from "antd/lib/typography/Paragraph";

export default () => {
  return (
    <div>
        <Typography>
            <Title>Introduction</Title>
            <Paragraph>
                In the process of internal desktop applications development, many different design specs and
                implementations would be involved, which might cause designers and developers difficulties and
                duplication and reduce the efficiency of development.
            </Paragraph>
        </Typography>
    </div>
  );
}
