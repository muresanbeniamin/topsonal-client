import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import theme from './components/theme';
import reducers from './reducers';
import App from './components/App';
import SignUp from './components/auth/SignUp';
import Dashboard from './components/pages/Dashboard';
import SignOut from './components/auth/SignOut';
import SignIn from './components/auth/SignIn';
import RecoverPassword from './components/auth/RecoverPassword';
import MyLists from './components/pages/MyLists';
import MyList from './components/list/MyList';
import ViewList from './components/list/ViewList';
import NewList from './components/list/NewList';
import MyFriends from './components/pages/MyFriends';
import NewItem from './components/item/NewItem';
import Profile from './components/pages/Profile';

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
          <Route path='/' exact component={SignIn} />
          <Route path='/signup' exact component={SignUp} />
          <Route path='/signout' exact component={SignOut} />
          <Route path='/dashboard' exact component={Dashboard} />
          <Route path='/my-lists' exact component={MyLists} />
          <Route path='/my-lists/:id' exact component={MyList} />
          <Route path='/lists/:id' exact component={ViewList} />
          <Route path='/new-list' exact component={NewList} />
          <Route path='/new-item/:listId' exact component={NewItem} />
          <Route path='/my-friends' exact component={MyFriends} />
          <Route path='/recover-password' exact component={RecoverPassword} />
          <Route path='/profile' exact component={Profile} />
        </App>
      </MuiThemeProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
