/**
 * StackRouter
 */
import React, { ReactType } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Redux
import * as AppActions from '../../redux/actions';
import selectApp from '../../redux/selectors';

// Helpers
import autenticate from '../../providers/autenticate';

interface Props {
  path: string,
  exact: boolean,
  stack: 'authStack' | 'appStack',
  component: ReactType,
  setRol: (rol: string)=>void,
  onChangeStack: (url: string)=>void,
}

const StackRouter: React.FC<Props> = (props) => {
  const {
    path,
    exact,
    stack,
    component: Component,
    onChangeStack
  } = props;

  if (stack === 'authStack') {
    return (
      // @ts-ignore
      <Route
        path={path}
        exact={exact}
        render={
          props => autenticate()?
            <Redirect to={{ pathname: '/home', state: { from: props.location } }} />
            : <Component {...props} onChangeStack={onChangeStack} />
        }
      />
    );
  }

  // appStack
  return (
    <Route
      path={path}
      exact={exact}
      render={
        props => autenticate()?
          <Component {...props} onChangeStack={onChangeStack} />
          :
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location }
            }}
          />
      }
    />
  );
};

const mapStateToProps = selectApp();

function mapDispatchToProps (dispatch: any) {
  const actions = bindActionCreators(AppActions, dispatch);
  return {
    dispatch,
    ...actions
  };
}

StackRouter.defaultProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(StackRouter);