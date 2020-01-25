import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from './components/theme';

import reducers from './reducers';
import App from './components/App';
import SignUp from './components/auth/SignUp';
import Dashboard from './components/Dashboard';
import SignOut from './components/auth/SignOut';
import SignIn from './components/auth/SignIn';
import RecoverPassword from './components/auth/RecoverPassword';
import MyLists from './components/MyLists';

const store = createStore(
  reducers, {
    auth: { authenticated: localStorage.getItem('token') }
  }, applyMiddleware(reduxThunk)
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <App>
          <Route path="/" exact component={SignIn} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/signout" exact component={SignOut} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/my-lists" exact component={MyLists} />
          <Route path="/recover-password" exact component={RecoverPassword} />
        </App>
      </MuiThemeProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
