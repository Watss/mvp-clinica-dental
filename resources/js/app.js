import React from 'react';
import { ThemeProvider } from "@material-ui/core";
import {useRoutes} from 'react-router-dom';
import { Provider } from "react-redux";
import routes from "./routes/Routes";
import theme from './utils/theme';
import generateStore from './redux/store';
import GlobalStyles from "./components/GlobalStyles";

const store = generateStore();

const App = () => {

  const routing = useRoutes(routes);
  return (
    <Provider store={store}>
            <ThemeProvider theme={theme}>
                    <GlobalStyles />
                    {routing}
            </ThemeProvider>
      </Provider>
    );
}

export default App;