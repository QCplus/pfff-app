import React from "react";
import { Button, Input } from "antd";
import AddFromQrCodeRequest from "../../../api/requests/purchase/AddFromQrCodeRequest";
import QrCodeScanner from "../../shared/qr-code-scanner/qr-code-scanner";

export type CheckQrCodeFormProps = {
    onSuccessSubmit: () => void;
};

const CheckQrCodeForm = (props: CheckQrCodeFormProps) => {
    const [code, setCode] = React.useState("");

    const onScan = (data: string) => {
        if (data) setCode(data);
    };

    const onSubmit = () => {
        new AddFromQrCodeRequest()
            .send(code)
            .then((r) => props.onSuccessSubmit());
    };

    return (
        <div>
            <QrCodeScanner
                onScan={onScan}
                enabled={true}
                videoProps={{ style: { width: "100%" } }}
            />
            <Input.Group
                compact
                style={{ display: "flex", marginTop: "0.5rem" }}
            >
                <Input value={code} disabled />
                <Button type="primary" onClick={onSubmit}>
                    Submit
                </Button>
            </Input.Group>
        </div>
    );
};

export default CheckQrCodeForm;
