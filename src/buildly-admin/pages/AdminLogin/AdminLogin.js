import React from 'react'
import { oauthService } from 'midgard/modules/oauth/oauth.service'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { FjButton, FjInputField, createTheme } from '@buildlyio/freyja-react'
import { login } from 'midgard/redux/authuser/actions/authuser.actions'
import AuthForm from 'midgard/components/AuthForm/AuthForm'
import { useInput } from 'midgard/hooks/useInput'

/**
 * Outputs the admin login form page for the application.
 */
function AdminLogin({dispatch, loading}) {
  const username = useInput('', { required: true });
  const password = useInput('', { required: true });

  const registerLink = { label: 'Register', value: '/register' };
  if (oauthService.hasValidAccessToken()) {
    return <Redirect push to="/admin-panel/coregroups" />;
  }

  /**
   * Submit the form to the backend and attempts to authenticate
   * @param {Event} event the default submit event
   */
  const submit = (event) => {
    event.preventDefault();
    const loginFormValue = {
      username: username.value,
      password: password.value
    };
    dispatch(login(loginFormValue));
  }

  return (
    <AuthForm onSubmit={submit} link={registerLink}>
      <FjInputField
        label="Username"
        id="username"
        type="text"
        placeholder="Enter username"
        {...username.bind} />
      <FjInputField
        label="Password"
        id="password"
        type="password"
        placeholder="Enter password"
        {...password.bind} />
      <FjButton
        disabled={loading}
        type="submit">
        Admin login
      </FjButton>
    </AuthForm>
  )
}

const mapStateToProps = (state, ownProps) => ({...ownProps, ...state.authReducer});

export default connect(mapStateToProps)(AdminLogin);
