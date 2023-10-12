import React from 'react';
import { Button, DatePicker, Form, Input, InputNumber, Space } from 'antd';

import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import AddPurchaseRequest from '../../../api/requests/purchase/AddPurchaseRequest';
import GetPurchasesTagsRequest from '../../../api/requests/purchase/GetPurchasesTagsRequest';
import { DATE_TIME_FORMAT } from '../../../globals';
import TagInput from '../tag-input/tag-input';

dayjs.extend(timezone);
dayjs.extend(utc);

const INITIAL_VALUES = { quantity: 1, payment_time: dayjs(new Date().toLocaleString().replace(',', ''), DATE_TIME_FORMAT) };

const getTagsRequest = new GetPurchasesTagsRequest();

export type NewItemFormProps = {
    onSuccessSubmit: () => void;
}

const NewItemForm = (props: NewItemFormProps) => {
    const [form] = Form.useForm();

    const postForm = (formData: any) => {
        formData.payment_time = dayjs.tz(formData.payment_time).format().split('+')[0]

        new AddPurchaseRequest()
            .send(formData)
            .then(r => {
                form.resetFields();

                props.onSuccessSubmit();
            });
    }

    return (
        <Form
            initialValues={INITIAL_VALUES}
            form={form}
            onFinish={postForm}
        >
            <Form.Item
                label='Item name'
                name='name'
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>

            <Form.Item style={{ marginBottom: 0 }}>
                <Space direction='horizontal' size='large'>
                    <Form.Item
                        label='Quantity'
                        name='quantity'
                        rules={[{ required: true }]}
                        style={{ display: 'inline-block' }}
                    >
                        <InputNumber style={{ width: '80px' }}
                        />
                    </Form.Item>

                    <Form.Item
                        label='Payment time'
                        name='payment_time'
                        rules={[{ required: true }]}
                        style={{ display: 'inline-block' }}
                    >
                        <DatePicker showTime format={DATE_TIME_FORMAT} />
                    </Form.Item>
                </Space>
            </Form.Item>

            <Form.Item style={{ marginBottom: 0 }}>
                <Space direction='horizontal' size='large'>
                    <Form.Item
                        label='Price'
                        name='price'
                        rules={[{ required: true }]}
                    >
                        <InputNumber style={{ width: '120px' }} />
                    </Form.Item>

                    <Form.Item
                        label='Shop'
                        name='shop'
                    >
                        <Input />
                    </Form.Item>
                </Space>
            </Form.Item>

            <Form.Item
                label='Category'
                name='category'
            >
                <TagInput getTagsRequest={getTagsRequest} />
            </Form.Item>

            <Form.Item>
                <Button type='primary' htmlType='submit'>
                    Add Item
                </Button>
            </Form.Item>
        </Form>
    )
}

export default NewItemForm;