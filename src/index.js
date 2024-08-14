import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* 为 React 提供Redux Store （*1.3） */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);


