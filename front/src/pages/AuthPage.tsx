import React from "react";

import { useAppSelector } from "../hooks/redux";
import LoginForm from "../components/forms/login-form/login-form";
import RegisterForm from "../components/forms/register-form/register-form";

const AuthPage = () => {
    const options = useAppSelector((state) => state.apiOptions);

    return options.firstRun ? <RegisterForm /> : <LoginForm />;
};

export default AuthPage;
