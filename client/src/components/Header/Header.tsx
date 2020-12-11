import React, { FunctionComponent } from 'react';
import './Header.scss';
import Logo from '../../assets/main-logo.svg';

type HeaderProps = {
  title: string
}

const Header: FunctionComponent<HeaderProps> = props => 
  <div className="main-header">
    <img src={Logo} className="logo" alt="BookMooch Go logo"/>
    <h1 className="title">{props.title}</h1>
  </div>;

export default Header;
