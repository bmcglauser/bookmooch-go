import React from 'react'
import { useQuery } from '@apollo/client';
import actionService from '../../services/actionService';
import ErrorPage from '../../pages/errorPage';

export default function MoochNowController ({asin, giverid, selfAddress,...props}) {
  const query = actionService.MOOCH_NOW(asin, giverid, selfAddress);
  const { loading, error, data } = useQuery(query);

  if (loading) return <p>loading</p>
  if (error) return <p>{error.message}</p>;

  if (data && data.moochNow === "success") {
    props.ctx.history.push(`/pending`);
    props.ctx.history.go(0);
  } else return (<ErrorPage ctx={props.ctx} message="Mooch failed"/>);
}