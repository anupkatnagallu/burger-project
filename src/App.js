import React, { useEffect, Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BugerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout');
});

const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders');
});

const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth');
});

const App = props => {

  const { checkAutoLogin } = props;

  useEffect(() => {
    checkAutoLogin();
  }, [checkAutoLogin]);

  let routes = (
    <Switch>
      <Route path='/auth' render={(props) => <Auth {...props} />} />
      <Route path='/' exact component={BurgerBuilder} />
      <Redirect to='/' />
    </Switch>
  )
  if (props.isAuth) {
    routes = (
      <Switch>
        <Route path='/checkout' render={(props) => <Checkout {...props} />} />
        <Route path='/orders' render={(props) => <Orders {...props}/>} />
        <Route path='/logout' component={Logout} />
        <Route path='/auth' render={(props) => <Auth {...props}/>} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to='/' />
      </Switch>
    )
  }
  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>
          {routes}
        </Suspense>
      </Layout>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isAuth: state.ar.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkAutoLogin: () => dispatch(actions.checkAuthState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
