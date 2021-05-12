import * as React from 'react';
import logo from '../../images/Deca logo.png';
import './login.css';

const URL = 'http://localhost:3000';
// const URL = 'https://fintrackbteam.herokuapp.com';
interface IProps {
  login: React.MouseEventHandler<HTMLButtonElement>;
}

const Login = (props: IProps) => {
    const { login } = props;
    const loggerHandler = () => {
    console.log('am here')
    location.replace(`${URL}/login`)
  }
    return (
      <section className="login-container">
        <div className="logo-container">
          <img src="https://decagon-clever.netlify.app/img/logo-white.svg" alt="Logo" className="Deca-logo" />
          <p className="Deca-desc">
            Decagon is a software engineering institute ushering in a new phase
            of tech-powered growth and prosperity in Nigeria by training and
            deploying an army of leader-developers.
          </p>
        </div>
        <div className="btn-container">
          <h1>Welcome To Fin-Track</h1>
          <h3>Please Login</h3>
          <button className="btn" onClick={loggerHandler}>
            Login
          </button>
        </div>
      </section>
    );
}

export default Login;