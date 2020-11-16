import React from 'react';
import controllers from '../../components/Controllers';
import ErrorPage from '../errorPage';

export default function ActionControllerPage (props) {
  
  const {
    action,
    itemid,
    username,
    pw,
    score,
    giverid,
    selfAddress
  } = props.match.params;
  
  const {
    AddController,
    LoginController,
    RemoveController,
    MoochNowController,
  } = controllers;

  switch (action) {
    case 'login':
      return <LoginController ctx={props} username={username} pw={pw} />;
    case 'add':
      return <AddController ctx={props} asin={itemid}/>;
    default:
      return <ErrorPage ctx={props} message="Invalid action" />
  }
}