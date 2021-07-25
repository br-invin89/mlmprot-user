import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import store from "epics/store";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import trans_en from "translations/en.json";
import trans_fr from "translations/fr.json";
import theme from "./theme";

i18next.init({
  interpolation: { escapeValue: false },
  lng: "en",
  resources: {
    en: {
      translation: trans_en,
    },
    fr: {
      translation: trans_fr,
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18next}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </I18nextProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
serviceWorker.unregister();
