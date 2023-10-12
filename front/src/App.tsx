import React from 'react';

import { useAppDispatch, useAppSelector } from './hooks/redux';
import ModalFormProvider from './contexts/modal-form-context/modal-form-context';
import GetOptionsRequest from './api/requests/GetOptionsRequest';
import RegisterPage from './pages/RegisterPage';
import { setOptions } from './redux/reducers/apiOptions';
import './App.css';
import CookiesManager from './services/CookiesManager';
import AnalyticsPage from './pages/AnalyticsPage';

function App() {
    const [loggedIn, setLoggedIn] = React.useState(false);
    const options = useAppSelector(state => state.apiOptions);
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        if (options.wasSet)
            return;

        new GetOptionsRequest()
            .send()
            .then(r => {
                dispatch(setOptions(r.data))
            });
    }, [options, dispatch]);

    React.useEffect(() => {
        const token = new CookiesManager().get('auth');

        token && setLoggedIn(true);
    }, []);

    return (
        <ModalFormProvider>
            {
                loggedIn
                ? <AnalyticsPage />
                : <RegisterPage />
            }
        </ModalFormProvider>
    );
}

export default App;
