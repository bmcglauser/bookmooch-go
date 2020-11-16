import React from 'react'
import { useQuery } from '@apollo/client';
import actionService from '../../services/actionService';
import ErrorPage from '../../pages/errorPage';

export default function AddController (props) {
  const query = actionService.ADD_BOOK(props.asin);
  const { loading, error, data } = useQuery(query);

  if (loading) return <p>loading</p>
  if (error) return <p>{error.message}</p>;

  if (data && data.addBookToBookshelf === `${props.asin}`) {
    props.ctx.history.push(`/bookshelf`);
    props.ctx.history.go(0);
  } else return (<ErrorPage ctx={props.ctx} message="Add failed"/>);
}