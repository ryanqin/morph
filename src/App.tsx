import React, {useEffect} from 'react';
import './App.css';
import {ThemeProvider} from "@mui/material";
import {createCustomTheme} from "./theme";
import { useRoutes } from "react-router-dom";
import routes from "./routes";
import useSettings from "./hooks/aboutSettings/useSettings";
import {FETCH_DATA} from "./redux/middlewares/api";
import useProtocols from './hooks/aboutProtocols/useProtocols';
import useWallet from "./hooks/aboutWallet/useWallet";

function App() {
    const { settings} = useSettings();
    const content = useRoutes(routes);
    useProtocols(FETCH_DATA);
    const {walletConfigurator} = useWallet();

    useEffect(()=>{
        walletConfigurator();
    }, [])

    const theme = createCustomTheme(
        {
            direction: "ltr",
            responsiveFontSizes: true,
            roundedCorners: false,
            theme: settings.theme,
        }
    )

    return (
      <div className="App">
          <ThemeProvider theme={theme}>
              {content}
          </ThemeProvider>
      </div>
  );
}

export default App;
