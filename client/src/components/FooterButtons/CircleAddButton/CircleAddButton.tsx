import React, { FunctionComponent } from 'react';
import './CircleAddButton.scss';
import { Link } from 'react-router-dom';

const CircleAddButton: FunctionComponent = () =>
  <div className="circle-add-button-wrapper">
    <Link to='/findadd' style={{textDecoration:'none'}}>
      <button className="the-button">
        <div className="the-circle" />
        <div className="vertical-bar" />
        <div className="horizontal-bar" />
      </button>
    </Link>
    <p className="label">Add a Book</p>
  </div>;

export default CircleAddButton;