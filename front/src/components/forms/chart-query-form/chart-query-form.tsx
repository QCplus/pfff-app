import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import ReactCodeMirror from "@uiw/react-codemirror";
import { sql } from "@codemirror/lang-sql";

import CustomQuery from "../../../api/models/CustomQuery";

const INITIAL_VALUES = { q: "", title: "" } as CustomQuery;

export type ChartQueryFormProps = {
    queryId?: number;
    onSuccessSubmit: () => void;
};

const ChartQueryForm = (props: ChartQueryFormProps) => {
    const [isLoading, setIsLoading] = React.useState(!!props.queryId);
    const [form] = Form.useForm<CustomQuery>();

    React.useEffect(() => {
        if (props.queryId) {
        } else {
            form.resetFields();
            setIsLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.queryId]);

    const postForm = (formData: CustomQuery) => {
        request.send(formData).then((r) => {
            props.onSuccessSubmit();
        });
    };

    return (
        <>
            {isLoading ? (
                <LoadingOutlined />
            ) : (
                <Form
                    initialValues={INITIAL_VALUES}
                    autoComplete="off"
                    onFinish={postForm}
                    form={form}
                >
                    <Form.Item name="id" hidden>
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Query Title"
                        name="title"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item name="q" rules={[{ required: true }]}>
                        <ReactCodeMirror
                            height="200px"
                            placeholder="Write your code here"
                            extensions={[sql({ upperCaseKeywords: true })]}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {props.queryId ? "Update Query" : "Add Query"}
                        </Button>
                    </Form.Item>

                    <span>Query should return two columns (label, value)</span>
                </Form>
            )}
        </>
    );
};

export default ChartQueryForm;
