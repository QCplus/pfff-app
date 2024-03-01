import React from "react";

import QrScanner from "qr-scanner";

export type QrCodeScannerProps = {
    onScan: (data: string) => void;
    onError?: (data: string) => void;
    enabled: boolean;
    videoProps?: React.DetailedHTMLProps<
        React.VideoHTMLAttributes<HTMLVideoElement>,
        HTMLVideoElement
    >;
};

const QrCodeScanner = (props: QrCodeScannerProps) => {
    const videoRef = React.useRef(null);
    const [qrScanner, setQrScanner] = React.useState<QrScanner | null>(null);

    React.useEffect(() => {
        if (videoRef?.current) {
            setQrScanner(
                new QrScanner(
                    videoRef.current,
                    (result) => props.onScan(result.data),
                    {
                        onDecodeError: (error) =>
                            props.onError && props.onError(error.toString()),
                        highlightScanRegion: true,
                    }
                )
            );
        }
    }, [props, videoRef]);

    React.useEffect(() => {
        if (qrScanner) {
            props.enabled ? qrScanner.start() : qrScanner.stop();
        }
    }, [props.enabled, qrScanner]);

    return <video ref={videoRef} {...props.videoProps}></video>;
};

export default QrCodeScanner;
