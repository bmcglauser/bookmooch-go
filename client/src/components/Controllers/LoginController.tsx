import React, { FunctionComponent} from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import actionService from '../../services/actionService';
import ErrorPage from '../../pages/errorPage';

type LoginControllerProps = {
  username: string,
  pw: string,
  ctx: RouteComponentProps
}

interface Data {
  login: { token: string }
}

const LoginController: FunctionComponent<LoginControllerProps> =  props => {
  const query = actionService.LOGIN(props.username, props.pw);
  const { loading, error, data } = useQuery<Data>(query);

  if (loading) return <div />;
  if (error) return <ErrorPage message={error.message} ctx={props.ctx}/>;

  if (data && data.login.token) {
    localStorage.setItem('token', data.login.token);
    props.ctx.history.push(`/profile/${props.username}`);
  } else return (<ErrorPage ctx={props.ctx} message="Login failed"/>)
  return <div />;
}

export default LoginController;