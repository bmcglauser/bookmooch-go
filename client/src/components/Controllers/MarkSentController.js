import React from 'react'
import { useQuery } from '@apollo/client';
import actionService from '../../services/actionService';
import RandomCenterLoader from '../Loaders/RandomCenterLoader';
import ErrorPage from '../../pages/errorPage';

export default function MarkSentController (props) {
  const pendingID = props.pendingID.split('+').join('/');
  const query = actionService.MARK_SENT(pendingID);
  const { loading, error, data } = useQuery(query);

  if (loading) return <RandomCenterLoader />;
  if (error) return <ErrorPage message={error.message} ctx={props.ctx}/>;

  if (data && data.markSent === "ok") {
    props.ctx.history.push(`/pending`);
    props.ctx.history.go(0);
  } else return (<ErrorPage ctx={props.ctx} message="Mark as sent failed"/>);
}