import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SettingsProvider } from "./contexts/SettingsContext";
import {IndexingTabsProvider} from "./contexts/IndexingTabsContext";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import { Provider as ReduxProvider } from "react-redux";
import store from "./redux/store";
import ScrollToTop from "./utils/ScrollToTop";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
console.log = () => {};

root.render(
  <React.StrictMode>
      <ReduxProvider store={store}>
          <SettingsProvider>
              <IndexingTabsProvider>
                  <BrowserRouter>
                      <ScrollToTop />
                      <App />
                  </BrowserRouter>
              </IndexingTabsProvider>
          </SettingsProvider>
      </ReduxProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
