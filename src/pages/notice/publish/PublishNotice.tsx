import * as React from 'react';
import MarkdownIt from 'markdown-it';
import Editor, { Plugins } from 'react-markdown-editor-lite';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import markdownItDeflist from 'markdown-it-deflist';
import markdownItImSize from 'markdown-it-imsize';
import service from './service';
import './PublishNotice.less';
import { Button, Card, Col, Form, Input, Row, Select, Space } from 'antd';
import { connect } from '@@/plugin-dva/exports';
import { useEffect, useRef, useState } from 'react';
const { Option } = Select;
Editor.use(Plugins.AutoResize, {
    min: 700, // 最小高度
    max: 1920, // 最大高度
});

const mdParser = new MarkdownIt({
    html: true,
    linkify: true,
    typography: true,
})
    .use(markdownItImSize)
    .use(markdownItDeflist);

function onImageUpload(file) {
    return new Promise((resolve) => {
        service.updatePic({ file: file }).then((res) => resolve(res));
    });
}

const index = ({ publishNotice, dispatch, location }) => {
    let mdEditorRef = useRef<MdEditor>(null);
    let titleInputRef = useRef<Input>(null);
    useEffect(() => {
        let originId = location.query.originId;
        if (originId !== undefined) {
            dispatch({
                type: 'publishNotice/getModifyNotice',
                payload: originId,
            });
        }
    }, []);

    useEffect(() => {
        if (publishNotice.modify) {
            // @ts-ignore
            mdEditorRef.current.setText(publishNotice.originNotice.contentMarkdown);
            // @ts-ignore
            titleInputRef.current.setValue(publishNotice.originNotice.title);
        }
    }, [publishNotice.modify]);

    const onFinish = ({ title, type, visibility }) => {
        //新发布和修改，不同的action
        if (publishNotice.modify) {
            dispatch({
                type: 'publishNotice/modifyNotice',
                payload: {
                    id: publishNotice.originNotice.id,
                    // @ts-ignore
                    title: titleInputRef.current.input.value,
                    noticeType: type,
                    visibility: visibility,
                    contentMarkdown: contentMd,
                    contentHtml: contentHtml,
                },
            });
        } else {
            dispatch({
                type: 'publishNotice/publish',
                payload: {
                    title: title,
                    noticeType: type,
                    visibility: visibility,
                    status: 1,
                    contentMarkdown: contentMd,
                    contentHtml: contentHtml,
                },
            });
        }
    };

    const handleEditorChange = ({ html, text }) => {
        setContentHtml(html);
        setContentMd(text);
    };
    const [contentHtml, setContentHtml] = useState<string>('');
    const [contentMd, setContentMd] = useState<string>('');

    return (
        <div>
            <div className="site-page-header">
                <Form name="customized_form_controls" onFinish={onFinish}>
                    <Row align="middle">
                        <Col span={12}>
                            <Form.Item name="title" style={{ marginBottom: 0 }}>
                                <Input
                                    placeholder={'请输入标题'}
                                    className="title-input"
                                    ref={titleInputRef}
                                />
                            </Form.Item>
                        </Col>

                        <Col span={12} className="title-submit">
                            <Row justify={'end'}>
                                <Space size={'middle'} align={'start'} style={{ paddingRight: 20 }}>
                                    <Form.Item label={'可见性'} name="visibility" initialValue={0}>
                                        <Select style={{ width: 120 }}>
                                            <Option value={0}>所有人</Option>
                                            <Option value={1}>注册用户</Option>
                                            <Option value={2}>管理员</Option>
                                        </Select>
                                    </Form.Item>

                                    <Form.Item label={'文章类型'} name="type" initialValue={1}>
                                        <Select style={{ width: 120 }}>
                                            <Option value={1}>公告</Option>
                                            <Option value={0}>教程</Option>
                                            <Option value={2}>科普</Option>
                                        </Select>
                                    </Form.Item>

                                    {!publishNotice.modify && (
                                        <Form.Item>
                                            <Button htmlType="submit">保存为草稿</Button>
                                        </Form.Item>
                                    )}

                                    <Form.Item>
                                        <Button type="primary" htmlType="submit">
                                            {publishNotice.modify ? '发布修改' : '发布'}
                                        </Button>
                                    </Form.Item>
                                </Space>
                            </Row>
                        </Col>
                    </Row>
                </Form>
            </div>

            <MdEditor
                renderHTML={(text) => mdParser.render(text)}
                onChange={handleEditorChange}
                onImageUpload={onImageUpload}
                defaultValue={contentMd}
                ref={mdEditorRef}
            />
        </div>
    );
};

const mapStateToProps = ({ publishNotice }) => {
    return {
        publishNotice,
    };
};
export default connect(mapStateToProps)(index);
