import React, { FunctionComponent } from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import actionService from '../../services/actionService';
import ErrorPage from '../../pages/errorPage';

type MoochNowControllerProps = {
  asin: string,
  giverid: string,
  selfAddress: string,
  ctx: RouteComponentProps
}

interface Data {
  moochNow: string
}

const MoochNowController: FunctionComponent<MoochNowControllerProps> = props => {
  const query = actionService.MOOCH_NOW(props.asin, props.giverid, props.selfAddress);
  const { loading, error, data } = useQuery<Data>(query);

  if (loading) return <div />;
  if (error) return <ErrorPage message={error.message} ctx={props.ctx}/>;

  if (data && data.moochNow === "success") {
    props.ctx.history.push(`/profile`);
  } else return (<ErrorPage ctx={props.ctx} message="Mooch failed"/>);
  return <div />;
}

export default MoochNowController;