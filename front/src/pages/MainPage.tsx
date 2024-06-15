import React from "react";

import { useAppSelector } from "../hooks/redux";
import AnalyticsPage from "./AnalyticsPage";
import AuthPage from "./AuthPage";

const MainPage = () => {
    const auth = useAppSelector((state) => state.authentication);

    return auth.token ? <AnalyticsPage /> : <AuthPage />;
};

export default MainPage;
