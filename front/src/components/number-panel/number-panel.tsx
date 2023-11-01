import React from "react";
import { Typography } from "antd";

const { Title } = Typography;

export type NumberPanelProps = {
    title?: string;
    value: string | number;
}

const NumberPanel = (props: NumberPanelProps) => {
    return (
        <div style={{ textAlign: 'center', position: 'relative', margin: '50px 0' }}>
            {
                props.title
                    ? <Title level={4} style={{ margin: 0 }}>{props.title}</Title>
                    : <></>
            }
            <Title level={4} style={{ margin: 0 }}>
                {props.value}
            </Title>

        </div>
    )
}

export default NumberPanel;