import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import actionService from '../../services/actionService';
import ErrorPage from '../../pages/errorPage';


type GiveFeedbackControllerProps = {
  pendingID: string,
  score: string,
  ctx: RouteComponentProps
}

interface Data {
  giveFeedback: string
}

const GiveFeedbackController: FunctionComponent<GiveFeedbackControllerProps> = props => {
  const pendingID = props.pendingID.split('+').join('/');

  const query = actionService.GIVE_FEEDBACK(pendingID, props.score);
  const { loading, error, data } = useQuery<Data>(query);

  if (loading) return <div />;
  if (error) return <ErrorPage message={error.message} ctx={props.ctx}/>;

  if (data && data.giveFeedback === "ok") {
    props.ctx.history.push('/profile');
  } else return (<ErrorPage message="Mark as recevied failed" ctx={props.ctx}/>);
  return <div />;
}

export default GiveFeedbackController;