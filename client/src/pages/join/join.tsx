import React from 'react';
import { Link } from 'react-router-dom';
import './join.scss';
import Header from '../../components/Header';
import JoinForm from '../../containers/JoinForm';


export default function JoinPage () : JSX.Element { 
  return (
    <>
    <Header title="Join BookMooch!" />
    <div className="join-page-grand-wrapper">
      <div className="join-form-wrapper">
        <JoinForm />
      </div>
      <div className="join-page-footer">
        <p>
          Already have an account? Log in <Link to="/login">here</Link>
        </p>
      </div>
    </div>
    </>
  );
}