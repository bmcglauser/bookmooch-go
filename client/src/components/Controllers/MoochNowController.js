import React from 'react'
import { useQuery } from '@apollo/client';
import actionService from '../../services/actionService';

export default function MoochNowController ({asin, giverid, selfAddress, selfCountry,...props}) {

  // const query = actionService.MOOCH_NOW(asin, giverid, selfAddress, selfCountry);
  // const { loading, error, data } = useQuery(query);

  // if (loading) return <p>loading</p>
  // if (error) return <p>{error.message}</p>;
  // if (data && data.login === '1') {
  //   props.history.push(`/bookshelf`);
  // } else props.history.push(`/errorPage`);

  // return (<div>Mooching....</div>)
}