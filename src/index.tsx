import './index.scss';
import './common/styles/Common.scss';

import App from './routes/App/App';
import {Provider} from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom/client';
import configureStore from './store';

const store = configureStore();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
