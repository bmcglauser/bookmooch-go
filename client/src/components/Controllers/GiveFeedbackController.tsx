import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import actionService from '../../services/actionService';
import ErrorPage from '../../pages/errorPage';


type GiveFeedbackControllerProps = {
  pendingID: string,
  score: string,
  ctx: RouteComponentProps
}

interface Data {
  giveFeedback: string
}

export default function GiveFeedbackController (props: GiveFeedbackControllerProps): JSX.Element {
  const pendingID = props.pendingID.split('+').join('/');

  const query = actionService.GIVE_FEEDBACK(pendingID, props.score);
  const { loading, error, data } = useQuery<Data>(query);

  if (loading) return <div />;
  if (error) return <ErrorPage message={error.message} ctx={props.ctx}/>;

  if (data && data.giveFeedback === "ok") {
    props.ctx.history.push(`/pending`);
    props.ctx.history.go(0);
  } else return (<ErrorPage ctx={props.ctx} message="Mark as recevied failed"/>);
  return <div />;
}