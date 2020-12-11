import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import controllers from '../../components/Controllers';
import ErrorPage from '../errorPage';

type TParams = {
  action: string,
  itemid: string,
  username: string,
  pw: string,
  score: string,
  giverid: string,
  textBlock: string
}

const ActionControllerPage: FunctionComponent<RouteComponentProps<TParams>> = props => {

  const {
    action,
    itemid,
    username,
    pw,
    score,
    giverid,
    textBlock
  } = props.match.params;

  const {
    AddController,
    LoginController,
    RemoveController,
    MoochNowController,
    MarkSentController,
    GiveFeedbackController,
    MarkRejectedController,

  } = controllers;

  switch (action) {
    case 'login':
      return <LoginController ctx={props} username={username} pw={pw} />;
    case 'add':
      return <AddController ctx={props} asin={itemid}/>;
    case 'remove':
      return <RemoveController ctx={props} asin={itemid}/>;
    case 'mooch':
      return <MoochNowController ctx={props} giverid={giverid} selfAddress={textBlock} asin={itemid}/>;
    case 'sent':
      return <MarkSentController ctx={props} pendingID={itemid} />;
    case 'received':
      return <GiveFeedbackController ctx={props} pendingID={itemid} score={score}/>;
    case 'reject':
      return <MarkRejectedController ctx={props} pendingID={itemid} />
    default:
      return <ErrorPage ctx={props} message="Invalid action" />
  }
}

export default ActionControllerPage;