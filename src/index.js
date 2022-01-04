import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { EnvProvider } from "./context/env.context";
import { Auth0ProviderWithHistory } from "./auth0-provider-with-history";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <EnvProvider>
          <Auth0ProviderWithHistory>
            <App />
          </Auth0ProviderWithHistory>
        </EnvProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
