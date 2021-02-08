import React from 'react';
import { ThemeProvider } from "@material-ui/core";
import {useRoutes} from 'react-router-dom';
import { Provider } from "react-redux";
import routes from "./routes/Routes";
import theme from './utils/theme';
import generateStore from './redux/store';
import GlobalStyles from "./components/GlobalStyles";
import { SnackbarProvider } from 'notistack';


const store = generateStore();

const App = () => {

  const routing = useRoutes(routes);
  return (
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
            <ThemeProvider theme={theme}>
                    <GlobalStyles />
                    {routing}
            </ThemeProvider>
      </SnackbarProvider>
    </Provider>
    );
}

export default App;