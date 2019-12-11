import React from 'react';
import './styles.scss';
import 'react-notifications/lib/notifications.css';
import { hot } from 'react-hot-loader';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { PrivateRoute } from './midgard/routes/Private.route';
import { oauthService } from './midgard/modules/oauth/oauth.service';
import { app, AppContext } from './midgard/context/App.context';
import Container from './midgard/layout/Container/Container';
import Login from './midgard/pages/Login/Login';
import Register from './midgard/pages/Register/Register';
import AdminLogin from './buildly-admin/pages/AdminLogin/AdminLogin';
import AdminPanel from './buildly-admin/pages/AdminPanel/AdminPanel';


function App() {
  return(
    <Router>
      <AppContext.Provider value={app}>
        <div className="app">
          <Route exact path="/" render={() => (
            oauthService.hasValidAccessToken() ? (
              <Redirect to="/app/profile/settings"/>
            ) : (
              <Redirect to="/login"/>
            )
          )}/>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/admin-login" component={AdminLogin} />
          <PrivateRoute path="/admin-panel/:endpoint" component={AdminPanel} />
          <PrivateRoute path="/app" component={Container} />
        </div>
      </AppContext.Provider>
    </Router>
  );
}

export default hot(module)(App);
