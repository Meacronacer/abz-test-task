import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import './index.scss';
import { Provider } from 'react-redux';
import { store } from './Redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
      <App />
    </Provider>
);