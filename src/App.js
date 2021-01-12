import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BugerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';

const num = 1;

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Route path='/' exact component={BurgerBuilder} />
          <Route path='/checkout' component={Checkout} />
          <Route path='/orders' component={Orders} />
        </Layout>
      </div>
    );
  }
}

export default App;
