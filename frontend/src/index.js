import { React, Provider } from 'react';
import createRoot from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './app/store';
import { BrowserRouter } from 'react-router-dom';

// Features
import { setAuthData } from './features/auth/authSlice';

// Utils
import { CookieUtils } from './utils/cookieUtils';

const start = async () => {
    const container = document.getElementById('root');
    const root = createRoot(container)

    const sessionCookie = CookieUtils.getCookie('rfa-t_session');
    if (sessionCookie) {
        store.dispatch(setAuthData(sessionCookie));
    }

    root.render(
        <React.StrictMode>
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        </React.StrictMode>
    );
}

start();