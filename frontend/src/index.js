import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from './redux/store';


export const BASE_URL="https://realtime-chat-app-eil8.onrender.com"
// export const BASE_URL="http://localhost:8080"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    
    <Provider store={store}>
        <App />
        <Toaster />
    </Provider>
)
