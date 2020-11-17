import React from 'react'
import { useQuery } from '@apollo/client';
import actionService from '../../services/actionService';
import ErrorPage from '../../pages/errorPage';

export default function LoginController ({username, pw, ...props}) {

  const query = actionService.LOGIN(username, pw);
  const { loading, error, data } = useQuery(query);

  if (loading) return <div />;
  if (error) return <ErrorPage message={error.message} ctx={props.ctx}/>;

  if (data && data.login === '1') {
    props.ctx.history.push(`/profile/${username}`);
    props.ctx.history.go(0);
  } else return (<ErrorPage ctx={props.ctx} message="Login failed"/>)
}