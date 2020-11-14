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
      <Link to="/about" style={{textDecoration: 'none'}}>
        <button>Let's go</button>
      </Link>
      <p className="footerLogin">
        Already have an account? Log in <Link to="/login">here</Link>
      </p>
    </div>
  )
}