import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select } from "antd";
import ReactCodeMirror from "@uiw/react-codemirror";
import { sql } from "@codemirror/lang-sql";

import AddQueryRequest from "../../../api/requests/query/AddQueryRequest";
import UpdateQueryRequest from "../../../api/requests/query/UpdateQueryRequest";
import GetQueryRequest from "../../../api/requests/query/GetQueryRequest";
import QueryViewTypeOptions from "../../../consts/options/QueryViewTypeOptions";
import QueryViewType from "../../../enums/QueryViewType";

type FormValues = {
    id?: number;
    q: string;
    title: string;
    viewType: QueryViewType;
};

export type NewQueryFormProps = {
    queryId?: number;
    onSuccessSubmit: () => void;
};

const fieldname = (field: keyof FormValues): string => field;

const INITIAL_VALUES = {
    q: "",
    title: "",
    viewType: QueryViewType.Table,
} as FormValues;

const NewQueryForm = (props: NewQueryFormProps) => {
    const [isLoading, setIsLoading] = React.useState(!!props.queryId);
    const [form] = Form.useForm<FormValues>();

    React.useEffect(() => {
        if (props.queryId) {
            new GetQueryRequest().send(props.queryId).then((r) => {
                form.setFieldsValue(r.data);
                setIsLoading(false);
            });
        } else {
            form.resetFields();
            setIsLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.queryId]);

    const postForm = (formData: FormValues) => {
        const request = props.queryId
            ? new UpdateQueryRequest()
            : new AddQueryRequest();

        request
            .send({
                q: formData.q,
                title: formData.title,
                viewType: formData.viewType,
                id: props.queryId,
            })
            .then(() => {
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
                    <Form.Item name={fieldname("id")} hidden>
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Query Title"
                        name={fieldname("title")}
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="View type"
                        name={fieldname("viewType")}
                        rules={[{ required: true }]}
                    >
                        <Select
                            options={QueryViewTypeOptions}
                            style={{ width: "100%" }}
                        ></Select>
                    </Form.Item>

                    <Form.Item
                        name={fieldname("q")}
                        rules={[{ required: true }]}
                    >
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
                </Form>
            )}
        </>
    );
};

export default NewQueryForm;
