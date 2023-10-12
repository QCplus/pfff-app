import React from "react";
import { Button, Input } from 'antd';
import QrReader from "react-qr-reader";
import AddFromQrCodeRequest from "../../../api/requests/purchase/AddFromQrCodeRequest";

export type CheckQrCodeFormProps = {
    onSuccessSubmit: () => void;
}

const CheckQrCodeForm = (props: CheckQrCodeFormProps) => {
    const [code, setCode] = React.useState('');

    const onScan = (data: string | null) => {
        if (data)
            setCode(data ?? '');
    }

    const onError = (data: string | null) => {
        console.error(data);
    }

    const onSubmit = () => {
        new AddFromQrCodeRequest().send(code)
            .then(r => props.onSuccessSubmit());
    }

    return (
        <div>
            <QrReader
                onScan={onScan}
                onError={onError}
            />

            <Input.Group compact style={{ display: 'flex', marginTop: '0.5rem' }}>
                <Input value={code} disabled />
                <Button type='primary' onClick={onSubmit}>Submit</Button>
            </Input.Group>
        </div>
    );
}

export default CheckQrCodeForm;