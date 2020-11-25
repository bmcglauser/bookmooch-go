import React from 'react'
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

export default function MoochNowController ({ asin, giverid, selfAddress,...props }: MoochNowControllerProps): JSX.Element {
  console.log(asin, giverid, selfAddress)
  const query = actionService.MOOCH_NOW(asin, giverid, selfAddress);
  const { loading, error, data } = useQuery<Data>(query);

  if (loading) return <div />;
  if (error) return <ErrorPage message={error.message} ctx={props.ctx}/>;

  if (data && data.moochNow === "success") {
    props.ctx.history.push(`/pending`);
    props.ctx.history.go(0);
  } else return (<ErrorPage ctx={props.ctx} message="Mooch failed"/>);
  return <div />;
}
