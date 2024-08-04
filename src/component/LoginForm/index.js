import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
  }

  handleSuccessfulLogin = jwtToken => {
    Cookies.set('jwtToken', jwtToken, {expires: 1})
    const {history} = this.props
    history.replace('/')
  }

  submitForm = async () => {
    const {username, password} = this.state
    const loginUrl = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    try {
      const response = await fetch(loginUrl, options)
      const data = await response.json()
      if (response.ok) {
        const jwtToken = data.jwt_token
        this.handleSuccessfulLogin(jwtToken)
      } else {
        const errorMsg = data.error_msg
        this.setState({errorMsg})
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    this.submitForm()
    this.setState({username: '', password: '', errorMsg: ''})
  }

  onChangeUserNameEle = event => {
    this.setState({username: event.target.value})
  }

  onChangePasswordEle = event => {
    this.setState({password: event.target.value})
  }

  renderForm = () => (
    <div className="form-section">
      <img
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website logo"
        className="logo-img"
      />
      <form onSubmit={this.handleSubmit} className="form">
        <div className="username-section">
          <label htmlFor="username" className="label">
            USERNAME
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            className="username-input-ele"
            onChange={this.onChangeUserNameEle}
            value={this.state.username}
          />
        </div>
        <div className="password-section">
          <label htmlFor="password" className="label">
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className="password-input-ele"
            onChange={this.onChangePasswordEle}
            value={this.state.password}
          />
        </div>
        <button type="submit" className="login-btn">
          Login
        </button>
        {this.state.errorMsg !== '' ? (
          <p className="message">* {this.state.errorMsg}</p>
        ) : (
          ''
        )}
      </form>
    </div>
  )

  render() {
    const jwtToken = Cookies.get('jwtToken')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return <div className="login-form-containers">{this.renderForm()}</div>
  }
}

export default LoginForm
