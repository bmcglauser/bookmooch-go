import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import './join.scss';
import Header from '../../components/Header';
import JoinForm from '../../containers/JoinForm';


const JoinPage: FunctionComponent = () =>  
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
  </>;

export default JoinPage;