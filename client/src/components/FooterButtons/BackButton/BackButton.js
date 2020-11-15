import React from 'react';
import './BackButton.scss'

export default function BackButton (props) {
  return (
    <div className="back-button-wrapper" onClick={()=>props.ctx.history.goBack()}>
      <button />
      <p>Go back</p>
    </div>
  );
}
