import React from 'react';
import './Header.scss';
// @ts-ignore
import Logo from '../../assets/main-logo.svg';

function Header({ title }) {

  return (
    <div className="main-header">
      <img src={Logo} className="logo" alt="BookMooch Go logo"/>
      <h1 className="title">{title}</h1>
    </div>
  );
}

export default Header;
