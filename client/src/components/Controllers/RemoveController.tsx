import React, { FunctionComponent } from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import actionService from '../../services/actionService';
import ErrorPage from '../../pages/errorPage';

type RemoveControllerProps = {
  asin: string,
  ctx: RouteComponentProps
}

interface Data {
  removeBookFromBookshelf: string
}

const RemoveController: FunctionComponent<RemoveControllerProps> = props => {
  const query = actionService.REMOVE_BOOK(props.asin);
  const { loading, error, data } = useQuery<Data>(query);

  if (loading) return <div />;
  if (error) return <ErrorPage message={error.message} ctx={props.ctx}/>;

  if (data && data.removeBookFromBookshelf === `${props.asin}`) {
    props.ctx.history.push(`/profile`);
  } else return (<ErrorPage ctx={props.ctx} message="Remove failed"/>);
  return <div />;
}

export default RemoveController;