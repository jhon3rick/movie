/**
 * @no-check
 * Login
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Redux
import * as AppActions from '../../redux/actions';
import * as LoginActions from './actions';
import selectLogin from './selectors';

// Components
import Panel from '../../components/panel';
import FormInput from '../../components/formInput';
import BodyContainer from '../../components/bodyContainer';

// Containers
import Button from '../../containers/button';

type Props = {
  // reducers
  name: string,
  password: string,
  history: {
    push: (url: string)=>void
  },

  // actions
  setName: ()=>void,
  setPassword: ()=>void,
  onChangeStack: ()=>void,
  fetchingLoginRequest: (userName: string, password: string)=>Object
}

class Login extends Component <Props, {}> {
    onSubmit = async () => {
    const {
      // reducers
      name,
      password,
      history,

      // action
      onChangeStack,
      fetchingLoginRequest,
    } = this.props;

    const responseLogin = await fetchingLoginRequest(name, password);
    // @ts-ignore
    if (responseLogin && responseLogin.success === true){
      onChangeStack();
      history.push('/home')
    }
  }
  render (){
    const {
      // redux
      name,
      password,

      // actions
      setName,
      setPassword
    } = this.props;

    return (
      <BodyContainer>
        <Panel>
          <Panel>
            <FormInput
              value={name}
              label="Username"
              onChange={setName}
            />
            <FormInput
              value={password}
              label="Password"
              onChange={setPassword}
            />
            <Button size="mid" onClick={this.onSubmit}>Login</Button>
          </Panel>
        </Panel>
      </BodyContainer>
    );
  }
}

const mapStateToProps = selectLogin();

function mapDispatchToProps (dispatch: any) {
  const actions = bindActionCreators({ ...AppActions, ...LoginActions }, dispatch);
  return {
    dispatch,
    ...actions
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);