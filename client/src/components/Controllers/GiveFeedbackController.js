import React from 'react'
import { useQuery } from '@apollo/client';
import actionService from '../../services/actionService';
import ErrorPage from '../../pages/errorPage';

export default function GiveFeedbackController (props) {
  const pendingID = props.pendingID.split('+').join('/');

  const query = actionService.GIVE_FEEDBACK(pendingID, props.score);
  const { loading, error, data } = useQuery(query);

  if (loading) return <div />;
  if (error) return <ErrorPage message={error.message} ctx={props.ctx}/>;

  if (data && data.giveFeedback === "ok") {
    props.ctx.history.push(`/pending`);
    props.ctx.history.go(0);
  } else return (<ErrorPage ctx={props.ctx} message="Mark as recevied failed"/>);
}