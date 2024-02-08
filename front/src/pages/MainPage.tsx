import React from "react";
import { useAppSelector } from "../hooks/redux";
import AnalyticsPage from "./AnalyticsPage";
import RegisterPage from "./RegisterPage";

const MainPage = () => {
    const [auth] = useAppSelector((state) => [state.authentication]);

    return auth.token ? <AnalyticsPage /> : <RegisterPage />;
};

export default MainPage;
