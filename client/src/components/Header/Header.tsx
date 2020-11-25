import React from 'react';
import './Header.scss';
import Logo from '../../assets/main-logo.svg';

type HeaderProps = {
  title: string
}

function Header({ title }: HeaderProps): JSX.Element {

  return (
    <div className="main-header">
      <img src={Logo} className="logo" alt="BookMooch Go logo"/>
      <h1 className="title">{title}</h1>
    </div>
  );
}

export default Header;
