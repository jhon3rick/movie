/**
 * Router
 */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import store from '../redux/store';

// my components
import Header from '../containers/header';
import StackRouter from '../components/stackRouter';
// import Panel from '../components/panel';
// import Button from '../containers/button';
// import Sidebar from '../components/sidebar';

// Utils
import autenticate from '../providers/autenticate';

// const
import { ARRAY_ROUTER, ARRAY_ROUTER_LOGOUT } from './const';

type Module = {
  text: string,
  route: string,
  style: Object,
  fontIcon: string,
  className: string,
  classRipple: string,
  classNameLabel: string,
}

type State = {
  isAuth: boolean,
}

type ItemRoute = {
  _id: string,
  path: string,
  stack: 'authStack' | 'appStack',
  component: Object
}

type Props = {}

// Const
const IS_AUTENTICATE = autenticate();

class Router extends Component <Props, State> {
  state = {
    isAuth: IS_AUTENTICATE
  };

  _onChangeStack = () => {
    console.log('onchange state');
    const { isAuth } = this.state;
    this.setState({ isAuth: !isAuth });
  }

  render () {
    const { isAuth } = this.state;
    return (
      <Provider store={store}>
        <div className="container-app">

          <BrowserRouter>
            <div className="screen">
              {
                isAuth ? (
                  <>
                    <Route
                      // @ts-ignore
                      render={ (headerProps) => <Header {...headerProps} onChangeStack={this._onChangeStack} /> }
                    />
                    <Switch>
                      {
                        // @ts-ignore
                        ARRAY_ROUTER.map((item: ItemRoute) => <StackRouter key={`router-${item._id}`} {...item} onChangeStack={this._onChangeStack} />)
                      }
                      <Route render={() => <h1>404 - Not Found</h1>} />
                    </Switch>
                  </>
                ) :
                (
                  <Switch>
                    {
                      // @ts-ignore
                      ARRAY_ROUTER_LOGOUT.map((item: ItemRoute) => <StackRouter key={`router-${item._id}`} {...item} onChangeStack={this._onChangeStack} />)
                    }
                    <Route render={() => <h1>404 - Not Found</h1>} />
                  </Switch>
                )
              }
            </div>
          </BrowserRouter>

        </div>
      </Provider>
    );
  }
}

export default Router;

