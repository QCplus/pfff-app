import React from 'react';
import { Button, DatePicker, Form, Input, InputNumber, Space } from 'antd';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import AddPurchaseRequest from '../../../api/requests/purchase/AddPurchaseRequest';
import GetPurchasesTagsRequest from '../../../api/requests/purchase/GetPurchasesTagsRequest';
import PurchaseModel from '../../../api/models/PurchaseModel';
import { DATE_TIME_FORMAT } from '../../../globals';
import TagInput from '../tag-input/tag-input';
import { nameof } from '../../../utils/common_utils';
import UpdatePurchaseRequest from '../../../api/requests/purchase/UpdatePurchaseRequest';

dayjs.extend(timezone);
dayjs.extend(utc);

const INITIAL_VALUES = { quantity: 1, paymentTimeDayjs: dayjs() };

const getTagsRequest = new GetPurchasesTagsRequest();

type PurchaseFormValue = {
    paymentTimeDayjs: Dayjs;
} & PurchaseModel;

export type PurchaseFormProps = {
    value?: PurchaseModel;
    onSuccessSubmit: () => void;
}

const PurchaseForm = (props: PurchaseFormProps) => {
    const [form] = Form.useForm<PurchaseFormValue>();

    React.useEffect(() => {
        props.value && form.setFieldsValue({ ...props.value, paymentTimeDayjs: dayjs(props.value.paymentTime) });
    }, [props.value, form]);

    const postForm = (formData: PurchaseFormValue) => {
        const payload = { ...formData, paymentTime: dayjs.tz(formData.paymentTimeDayjs).format().split('+')[0] } as PurchaseModel;

        if (formData.id) {
            new UpdatePurchaseRequest()
                .send(payload)
                .then(r => {
                    props.onSuccessSubmit();
                });
        }
        else {
            new AddPurchaseRequest()
                .send(payload)
                .then(r => {
                    form.resetFields();

                    props.onSuccessSubmit();
                });
        }
    }

    return (
        <Form
            initialValues={INITIAL_VALUES}
            form={form}
            onFinish={postForm}
        >
            <Form.Item
                hidden
                name={nameof<PurchaseFormValue>('id')}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label='Item name'
                name={nameof<PurchaseFormValue>('name')}
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>

            <Form.Item style={{ marginBottom: 0 }}>
                <Space direction='horizontal' size='large'>
                    <Form.Item
                        label='Quantity'
                        name={nameof<PurchaseFormValue>('quantity')}
                        rules={[{ required: true }]}
                        style={{ display: 'inline-block' }}
                    >
                        <InputNumber style={{ width: '80px' }}
                        />
                    </Form.Item>

                    <Form.Item
                        label='Payment time'
                        name={nameof<PurchaseFormValue>('paymentTimeDayjs')}
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
                        name={nameof<PurchaseFormValue>('price')}
                        rules={[{ required: true }]}
                    >
                        <InputNumber style={{ width: '120px' }} />
                    </Form.Item>

                    <Form.Item
                        label='Shop'
                        name={nameof<PurchaseFormValue>('shop')}
                    >
                        <Input />
                    </Form.Item>
                </Space>
            </Form.Item>

            <Form.Item
                label='Category'
                name={nameof<PurchaseFormValue>('category')}
            >
                <TagInput getTagsRequest={getTagsRequest} />
            </Form.Item>

            <Form.Item>
                <Button type='primary' htmlType='submit'>
                    {props.value?.id ? 'Update Purchase' : 'Add Purchase'}
                </Button>
            </Form.Item>
        </Form>
    )
}

export default PurchaseForm;