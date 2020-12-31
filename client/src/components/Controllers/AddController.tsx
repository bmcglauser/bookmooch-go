import React, { FunctionComponent } from 'react';
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

const AddController: FunctionComponent<AddControllerProps> = props => {
  const query = actionService.ADD_BOOK(props.asin);
  const { loading, error, data } = useQuery<Data>(query);

  if (loading) <div />;
  if (error) <ErrorPage message={error.message} ctx={props.ctx}/>;

  if (data && data.addBookToBookshelf === `${props.asin}`) {
    props.ctx.history.push(`/profile`);
  } else <ErrorPage ctx={props.ctx} message="Add failed"/>;
  return <div />;
}

export default AddController;