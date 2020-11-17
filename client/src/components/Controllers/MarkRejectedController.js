import React from 'react'
import { useQuery } from '@apollo/client';
import actionService from '../../services/actionService';
import ErrorPage from '../../pages/errorPage';

export default function MarkRejectedController (props) {
  const pendingID = props.pendingID.split('+').join('/');
  const query = actionService.REJECT_MOOCH(pendingID);
  const { loading, error, data } = useQuery(query);

  if (loading) return <div />;
  if (error) return <ErrorPage message={error.message} ctx={props.ctx}/>;

  if (data && data.markReject === "ok") {
    props.ctx.history.push(`/pending`);
    props.ctx.history.go(0);
  } else return (<ErrorPage ctx={props.ctx} message="Rejection failed"/>);
}