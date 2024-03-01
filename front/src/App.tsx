import React from "react";
import { LoadingOutlined } from "@ant-design/icons";

import { useAppDispatch, useAppSelector } from "./hooks/redux";
import ModalFormProvider from "./contexts/modal-form-context/modal-form-context";
import GetOptionsRequest from "./api/requests/GetOptionsRequest";
import { setOptions } from "./redux/reducers/apiOptions";
import "./App.css";
import MainPage from "./pages/MainPage";

function App() {
    const [isLoading, setIsLoading] = React.useState(true);
    const options = useAppSelector((state) => state.apiOptions);

    const dispatch = useAppDispatch();

    React.useEffect(() => {
        if (options.wasSet) return;

        new GetOptionsRequest().send().then((r) => {
            dispatch(setOptions(r.data));

            setIsLoading(false);
        });
    }, [options, dispatch]);

    return (
        <ModalFormProvider>
            {isLoading ? (
                <div style={{ textAlign: "center", margin: "45vh 0" }}>
                    <LoadingOutlined
                        style={{ margin: "auto", fontSize: "10rem" }}
                    />
                </div>
            ) : (
                <MainPage />
            )}
        </ModalFormProvider>
    );
}

export default App;
