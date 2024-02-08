import React from "react";
import { Button, Card, Form, Input } from "antd";
import localeValues from "antd/locale/en_US";

import { nameof } from "../utils/common_utils";
import AddUserRequest from "../api/requests/users/AddUserRequest";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import LoginRequest from "../api/requests/LoginRequest";
import { setToken } from "../redux/reducers/authentication";

type FormValues = {
    username: string;
    password: string;
    passwordRepeat: string;
};

const RegisterPage = () => {
    const [form] = Form.useForm<FormValues>();
    const options = useAppSelector((state) => state.apiOptions);
    const dispatch = useAppDispatch();

    const postForm = (formData: FormValues) => {
        const creds = {
            username: formData.username,
            password: formData.password,
        };

        if (options.firstRun) {
            new AddUserRequest()
                .send(creds)
                .then((r) => window.location.reload());
        } else {
            new LoginRequest().send(creds).then((r) =>
                dispatch(
                    setToken({
                        token: r.data.accessToken,
                        tokenType: r.data.tokenType,
                        expires: new Date(r.data.expireAt),
                    })
                )
            );
        }
    };

    return (
        <div style={{ height: "100vh", background: "#adc6ff" }}>
            <Card
                title={options.firstRun ? "Create a new user" : "Login"}
                style={{
                    width: 400,
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%,-50%)",
                }}
            >
                <Form
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                    requiredMark={false}
                    form={form}
                    onFinish={postForm}
                    autoComplete="off"
                    // eslint-disable-next-line no-template-curly-in-string
                    validateMessages={
                        localeValues.Form?.defaultValidateMessages
                    }
                >
                    <Form.Item
                        label="Username"
                        name={nameof<FormValues>("username")}
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name={nameof<FormValues>("password")}
                        rules={[{ required: true, min: 8 }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    {options.firstRun ? (
                        <Form.Item
                            hasFeedback
                            label="Password"
                            dependencies={[nameof<FormValues>("password")]}
                            name={nameof<FormValues>("passwordRepeat")}
                            rules={[
                                {
                                    required: true,
                                    message: "Please repeat password",
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (
                                            value &&
                                            getFieldValue(
                                                nameof<FormValues>("password")
                                            ) === value
                                        )
                                            return Promise.resolve();
                                        return Promise.reject(
                                            new Error("Passwords must match")
                                        );
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                    ) : (
                        <></>
                    )}

                    <br />
                    <Form.Item wrapperCol={{ offset: 6 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default RegisterPage;
