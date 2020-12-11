import React, { FunctionComponent } from 'react';
import './BackButton.scss'
import { RouteComponentProps } from 'react-router-dom'

type BackButtonProps = {
  ctx: RouteComponentProps
}

const BackButton: FunctionComponent<BackButtonProps> = props => 
  <div className="back-button-wrapper" onClick={()=>props.ctx.history.goBack()}>
    <button />
    <p>Go back</p>
  </div>;

export default BackButton;