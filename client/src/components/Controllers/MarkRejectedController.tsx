import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import actionService from '../../services/actionService';
import ErrorPage from '../../pages/errorPage';


type MarkRejectedControllerProps = {
  pendingID: string,
  ctx: RouteComponentProps
}

interface Data {
  markReject: string
}

export default function MarkRejectedController (props: MarkRejectedControllerProps): JSX.Element {
  const pendingID = props.pendingID.split('+').join('/');
  const query = actionService.REJECT_MOOCH(pendingID);
  const { loading, error, data } = useQuery<Data>(query);

  if (loading) return <div />;
  if (error) return <ErrorPage message={error.message} ctx={props.ctx}/>;

  if (data && data.markReject === "ok") {
    props.ctx.history.push(`/pending`);
    props.ctx.history.go(0);
  } else return (<ErrorPage ctx={props.ctx} message="Rejection failed"/>);
  return <div />;
}