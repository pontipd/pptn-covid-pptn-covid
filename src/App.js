import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './assets/css/reset.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/scss/main.scss';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

// import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';

function App() {
  library.add(fab, fas, far);
  return (
    <div>
      {/* <Header /> */}
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
      </Switch>
    </div>
  );
}

export default App;
