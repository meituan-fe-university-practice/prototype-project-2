import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button } from 'antd';
import './style.css'

const InputProject = (props) => {
    const { projectNameValue, onChange } = props;

    return (
        <Input value={projectNameValue} onChange={onChange} />
    )
}
const InputIcon = (props) => {
    const { iconLinkValue, onChange } = props;

    return (
        <Input value={iconLinkValue} onChange={onChange} />
    )
}
const InputDesc = (props) => {
    const { descValue, onChange } = props;

    return (
        <Input value={descValue} onChange={onChange} />
    )
}

const AddProjectForm = (props) => {
    const [form] = Form.useForm();
    const { onSubmit } = props;
    const [ projectNameValue, setProjectNameValue ] = useState('');
    const [ iconLinkValue, setIconLinkValue ] = useState('');
    const [ descValue, setDescValue ] = useState('');

    const onFinish = (values) => {
        console.log('Success:', values);
        onCancel();
    };

    const onCancel = () => {
        onSubmit();
        form.resetFields();
        setProjectNameValue('');
        setIconLinkValue('');
        setDescValue('');
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onProjectChange = (e) => {
        setProjectNameValue(e.target.value);
    }
    const onIconChange = (e) => {
        setIconLinkValue(e.target.value);
    }
    const onDescChange = (e) => {
        setDescValue(e.target.value);
    }

    return (
        <div className="form-container">
            <div className="form-title">
                创建项目
            </div>
            <Form
                className="form-form"
                name="basic"
                form={form}
                labelCol={{
                    span: 5,
                }}
                wrapperCol={{
                    span: 16,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    className="form-item"
                    label="项目名称"
                    name="projectName"
                    rules={[
                        {
                            required: true,
                            message: '请输入项目名称',
                        },
                    ]}
                >
                    <InputProject projectNameValue={projectNameValue} onChange={onProjectChange}/>
                </Form.Item>

                <Form.Item
                    className="form-item"
                    label="项目简介"
                    name="desc"
                    rules={[
                        {
                            required: true,
                            message: '请输入项目简介',
                        },
                    ]}
                >
                    <InputDesc descValue={descValue} onChange={onDescChange} />
                </Form.Item>

                <Form.Item
                    className="form-item"
                    label="封面链接"
                    name="iconLink"
                    rules={[
                        {
                            required: true,
                            message: '请输入封面链接',
                        },{
                            validator: (_, value) => {
                                const str = value;
                                const Expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
                                const objExp = new RegExp(Expression);
                                if (objExp.test(str) === true) {
                                    return Promise.resolve();
                                } else {
                                    return Promise.reject(new Error('Please input a URL'));
                                }
                            }
                        }
                    ]}
                >
                    <InputIcon iconLinkValue={iconLinkValue} onChange={onIconChange} />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                    <Button  htmlType="button" onClick={onCancel}>
                        取消
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddProjectForm;