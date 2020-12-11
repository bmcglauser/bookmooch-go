import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import actionService from '../../services/actionService';
import ErrorPage from '../../pages/errorPage';


type MarkSentControllerProps = {
  pendingID: string,
  ctx: RouteComponentProps
}

interface Data {
  markSent: string
}

const MarkSentController: FunctionComponent<MarkSentControllerProps> = props => {
  const pendingID = props.pendingID.split('+').join('/');
  const query = actionService.MARK_SENT(pendingID);
  const { loading, error, data } = useQuery<Data>(query);

  if (loading) return <div />;
  if (error) return <ErrorPage message={error.message} ctx={props.ctx}/>;

  if (data && data.markSent === "ok") {
    props.ctx.history.push(`/pending`);
    props.ctx.history.go(0);
  } else return (<ErrorPage ctx={props.ctx} message="Mark as sent failed"/>);
  return <div />;
}

export default MarkSentController;