import React from 'react';
import './BackButton.scss'
import { RouteComponentProps } from 'react-router-dom'

type BackButtonProps = {
  ctx: RouteComponentProps
}

export default function BackButton ({ctx}: BackButtonProps) : JSX.Element {
  return (
    <div className="back-button-wrapper" onClick={()=>ctx.history.goBack()}>
      <button />
      <p>Go back</p>
    </div>
  );
}
