/**
 * Header
 */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AppActions from '../../redux/actions';
import * as HeaderActions from './actions';
import selectHeader from './selectors';

// Components
import Panel from '../../components/panel';
import Button from '../button';
import Sidebar from '../sidebar';

// Utils
import { removeUser } from '../../providers/manageLogin';

import './style.scss';

type Module = {
  text: string,
  route: string,
  authorization: string,
  redirect?: boolean
}

type Props = {
  // navigations
  history: {
    push: (path: string) => void,
    location: { pathname: string }
  },

  // reducers
  rol: string,
  nameApp: string,
  buttons: Array<Module>,
  isMovileScreen: boolean,

  // actions
  onChangeStack: () => void
}

class Header extends Component<Props, {}> {
  userName: string = '';

  componentDidMount = async () => {
    const storageUser = sessionStorage.getItem('userName');
    if (storageUser) this.userName = storageUser;
  }

  _onExit = () => {
    const {
      // navigation
      history: {
        push,
      },
      // actions
      onChangeStack
    } = this.props;

    removeUser();
    onChangeStack();
    push('/');
  }

  render () {
    const {
      // navigation
      history: {
        push,
        location: { pathname }
      },

      // reducers
      nameApp,
    } = this.props;

    if (pathname === '/' || pathname === '/home-admin') return [];
    return (
      <div className="header">
        <Panel className="left">
          <Panel className="fs logo-container">
            <Panel>Bienvenido {this.userName}</Panel>
          </Panel>
        </Panel>

        <Panel className="fe right">
          {
            <Button
              type="vertical"
              addClass="fr"
              onClick={this._onExit}
            >
              Salir
            </Button>
          }
        </Panel>
      </div>
    );
  }
}

const mapStateToProps = selectHeader();

function mapDispatchToProps (dispatch: any) {
  const actions = bindActionCreators({ ...AppActions, ...HeaderActions }, dispatch);
  return {
    dispatch,
    ...actions
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);