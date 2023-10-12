import React from "react";
import { AutoComplete, Form, Input } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import ApiRequestBase from "../../../api/requests/ApiRequestBase";
import useFetch from "../../../hooks/useFetch";
import { BaseOptionType } from "antd/es/select";

export type TagInputProps = {
    value?: string;
    onChange?: (value: string, option: BaseOptionType) => void;
    getTagsRequest: ApiRequestBase<string[]>;
}

const TagInput = (props: TagInputProps) => {
    const [tags, isTagsLoading] = useFetch(props.getTagsRequest);
    const { status } = Form.Item.useStatus();

    return (
        <>
            {
                isTagsLoading
                    ? <Input.Search placeholder='Tags are loading' loading disabled />
                    : <AutoComplete
                        className={`custom-input-${status}`}
                        value={props.value}
                        onChange={props.onChange}
                        allowClear
                        options={tags?.map(t => { return { value: t } }) ?? []}
                        filterOption
                        placeholder='Start typing'
                        suffixIcon={<LoadingOutlined />}
                    />
            }
        </>
    )
}

export default TagInput;