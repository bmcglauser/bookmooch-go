import React from 'react';
import './landing.scss';
import { Link } from 'react-router-dom';
// @ts-ignore
import Logo from '../../assets/main-logo.svg';
import WelcomeText from '../../components/WelcomeText';

export default function LandingPage () {
  return (
    <div className='landing'>
      <img src={Logo} className="logo" alt="BookMooch Go logo"/>
      <div className="welcome-text-wrapper">
        <WelcomeText back={false} />
      </div>
      <div className="buttons-wrapper">
        <Link to="/about" style={{textDecoration: 'none'}}>
          <button>Let's go</button>
        </Link>
        <Link to="/login" style={{textDecoration: 'none'}}>
          <button>Login</button>
        </Link>
      </div>
    </div>
  )
}