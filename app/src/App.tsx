import React from 'react';
import 'src/App.css';
import { Box } from 'rebass';
import { ThemeProvider } from 'theme-ui';
import { Provider } from 'urql';
import client from 'src/graphqlClient';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from 'src/pages/HomePage';
import theme from 'src/theme';
import BallotPage from 'src/pages/BallotPage';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Provider value={client}>
        <Box mt={50} mb={70}>
          <Router>
            <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route path="/ballot/:id">
                <BallotPage />
              </Route>
            </Switch>
          </Router>
        </Box>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
