import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Button, Form, Input, } from "antd";
import ReactCodeMirror from "@uiw/react-codemirror";
import { sql } from '@codemirror/lang-sql';

import CustomQuery from "../../../api/models/CustomQuery";
import AddQueryRequest from "../../../api/requests/query/AddQueryRequest";
import UpdateQueryRequest from "../../../api/requests/query/UpdateQueryRequest";
import GetQueryRequest from "../../../api/requests/query/GetQueryRequest";

const INITIAL_VALUES = { q: '', title: '' } as CustomQuery;

export type NewQueryFormProps = {
    queryId?: number;
    onSuccessSubmit: () => void;
}

const NewQueryForm = (props: NewQueryFormProps) => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [form] = Form.useForm<CustomQuery>();

    React.useEffect(() => {
        if (props.queryId) {
            setIsLoading(true);

            new GetQueryRequest().send(props.queryId)
                .then(r => {
                    form.setFieldsValue(r.data)
                    setIsLoading(false);
                })
        }
        else {
            form.resetFields();
            setIsLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.queryId])

    const postForm = (formData: any) => {
        const request = props.queryId ? new UpdateQueryRequest() : new AddQueryRequest();

        request
            .send(formData as CustomQuery)
            .then(r => {
                props.onSuccessSubmit();
            });
    }

    return (
        <>
            {
                isLoading
                    ? <LoadingOutlined />
                    :
                    <Form
                        initialValues={INITIAL_VALUES}
                        autoComplete='off'
                        onFinish={postForm}
                        form={form}
                    >
                        <Form.Item
                            name='id'
                            hidden
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label='Query Title'
                            name='title'
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name='q'
                            rules={[{ required: true }]}
                        >
                            <ReactCodeMirror
                                height="200px"
                                placeholder='Write your code here'
                                extensions={[sql({ upperCaseKeywords: true })]}
                            />
                            {/* <Input.TextArea rows={4} placeholder='Write your code here' /> */}
                        </Form.Item>

                        <Form.Item>
                            <Button type='primary' htmlType='submit'>
                                {
                                    props.queryId
                                        ? 'Update Query'
                                        : 'Add Query'
                                }
                            </Button>
                        </Form.Item>
                    </Form>
            }
        </>
    )
}

export default NewQueryForm;