import React from 'react';
import { Button, Space, Tooltip } from 'antd';
import { DollarCircleOutlined, QrcodeOutlined, ShoppingCartOutlined } from '@ant-design/icons';

import { ModalFormContext } from '../../contexts/modal-form-context/modal-form-context';
import CheckQrCodeForm from '../forms/check-qr-code-form/check-qr-code-form';
import NewPaymentForm from '../forms/new-payment-form/new-payment-form';
import PurchaseForm from '../forms/purchase-form/purchase-form';

const ContentHeader = () => {
    const { openModal, closeModal } = React.useContext(ModalFormContext);

    const onAddPurchaseBtnClick = () => {
        openModal('Add New Purchase', <PurchaseForm onSuccessSubmit={closeModal} />);
    }

    const onScanCodeBtnClick = () => {
        openModal('Scan QR Code', <CheckQrCodeForm onSuccessSubmit={closeModal} />);
    }

    const onAddPaymentBtnClick = () => {
        openModal('Add New Payment', <NewPaymentForm onSuccessSubmit={closeModal} />);
    }

    return (
        <Space direction='horizontal'>
            <Tooltip title='Add New Purchase'>
                <Button
                    type='primary'
                    onClick={onAddPurchaseBtnClick}
                    icon={<ShoppingCartOutlined />}
                    size='large'
                ></Button>
            </Tooltip>

            <Tooltip title='Scan QRcode'>
                <Button
                    type='primary'
                    icon={<QrcodeOutlined />}
                    size='large'
                    onClick={onScanCodeBtnClick}
                />
            </Tooltip>

            <Tooltip title='Add New Payment'>
                <Button
                    type='primary'
                    icon={<DollarCircleOutlined />}
                    size='large'
                    onClick={onAddPaymentBtnClick}
                />
            </Tooltip>
        </Space>
    )
}

export default ContentHeader;