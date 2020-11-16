import React from 'react'
import { useQuery } from '@apollo/client';
import actionService from '../../services/actionService';
import RandomCenterLoader from '../Loaders/RandomCenterLoader';
import ErrorPage from '../../pages/errorPage';

export default function RemoveController (props) {
  const query = actionService.REMOVE_BOOK(props.asin);
  const { loading, error, data } = useQuery(query);

  if (loading) {
    return <RandomCenterLoader />;
  }
  if (error) {
    return <ErrorPage message={error.message} ctx={props.ctx}/>
  }

  if (data && data.removeBookFromBookshelf === `${props.asin}`) {
    props.ctx.history.push(`/bookshelf`);
    props.ctx.history.go(0);
  } else return (<ErrorPage ctx={props.ctx} message="Remove failed"/>);
}