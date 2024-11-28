import React from "react";

import "./huge-button.css";

export type HugeButtonProps = {
    children: string | React.ReactNode;
    onClick: () => void;
    height: string;
    width: string;
    text?: string;
};

const HugeButton = (props: HugeButtonProps) => {
    return (
        <span
            className="huge-button"
            onClick={props.onClick}
            style={{ width: props.width, height: props.height }}
        >
            {props.children}
            {props.text ? (
                <span className="huge-button-text">{props.text}</span>
            ) : (
                <></>
            )}
        </span>
    );
};

export default HugeButton;
