import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import actionService from '../../services/actionService';
import ErrorPage from '../../pages/errorPage';

type AddControllerProps = {
  ctx: RouteComponentProps,
  asin: string
}

interface Data {
  addBookToBookshelf: string
}

export default function AddController (props: AddControllerProps): JSX.Element {
  const query = actionService.ADD_BOOK(props.asin);
  const { loading, error, data } = useQuery<Data>(query);

  if (loading) return <div />;
  if (error) return <ErrorPage message={error.message} ctx={props.ctx}/>;

  if (data && data.addBookToBookshelf === `${props.asin}`) {
    props.ctx.history.push(`/bookshelf`);
    props.ctx.history.go(0);
  } else return (<ErrorPage ctx={props.ctx} message="Add failed"/>);
  return <div />;
}