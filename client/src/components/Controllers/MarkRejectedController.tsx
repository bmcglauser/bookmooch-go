import React, { FunctionComponent } from 'react';
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

const MarkRejectedController: FunctionComponent<MarkRejectedControllerProps> = props => {
  
  const slashedPendingID = props.pendingID.split('+').join('/');
  const query = actionService.REJECT_MOOCH(slashedPendingID);
  const { loading, error, data } = useQuery<Data>(query);

  if (loading) return <div />;
  if (error) return <ErrorPage message={error.message} ctx={props.ctx}/>;

  if (data && data.markReject === "ok") {
    props.ctx.history.push(`/profile`);
  } else return (<ErrorPage ctx={props.ctx} message="Rejection failed"/>);
  return <div />;
}

export default MarkRejectedController;