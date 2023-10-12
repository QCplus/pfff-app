import React from "react";
import { Button, DatePicker, Form, InputNumber } from "antd";
import TagInput from "../tag-input/tag-input";

import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { DATE_TIME_FORMAT } from "../../../globals";
import AddPaymentRequest from "../../../api/requests/payments/AddPaymentRequest";
import GetPaymentTagsRequest from "../../../api/requests/payments/GetPaymentTagsRequest";

dayjs.extend(timezone);
dayjs.extend(utc);

export type NewPaymentFormProps = {
    onSuccessSubmit: () => void;
}

const INITIAL_VALUES = { payment_date: dayjs(new Date().toLocaleString().replace(',', ''), DATE_TIME_FORMAT) };

const GET_TAGS_REQUEST = new GetPaymentTagsRequest();

const NewPaymentForm = (props: NewPaymentFormProps) => {
    const [form] = Form.useForm();

    const postForm = (formData: any) => {
        formData.payment_date = dayjs.tz(formData.payment_date).format().split('+')[0]

        new AddPaymentRequest()
            .send(formData)
            .then(r => {
                form.resetFields();

                props.onSuccessSubmit();
            });
    }

    return (
        <Form
            form={form}
            initialValues={INITIAL_VALUES}
            onFinish={postForm}
        >
            <Form.Item
                label='Amount'
                name='amount'
                rules={[{ required: true }]}
            >
                <InputNumber />
            </Form.Item>

            <Form.Item
                label='Payment date'
                name='payment_date'
                rules={[{ required: true }]}
            >
                <DatePicker showTime format={DATE_TIME_FORMAT} />
            </Form.Item>

            <Form.Item
                label='Category'
                name='category'
            >
                <TagInput getTagsRequest={GET_TAGS_REQUEST} />
            </Form.Item>

            <Form.Item>
                <Button type='primary' htmlType='submit'>
                    Add Item
                </Button>
            </Form.Item>
        </Form>
    )
}

export default NewPaymentForm;