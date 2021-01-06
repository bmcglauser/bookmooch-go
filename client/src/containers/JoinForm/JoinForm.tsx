import React, { FunctionComponent } from 'react';
import './JoinForm.scss';

const JoinForm: FunctionComponent = () =>
  <form className="join-form">
    <label htmlFor="username">Username (jsmith02):
      <input id="username" name="username" type="text" required />
    </label><br />
    <label htmlFor="display_name">Display name (Jane S):
      <input id="display_name" name="display_name" type="text" required />
    </label><br />
    <label htmlFor="email">E-mail address:
      <input id="email" name="email" type="text" required />
    </label><br />
    <label htmlFor="password">Password:
      <input id="password" name="password" type="password" required />
    </label><br />
    <label htmlFor="confirm-password">Confirm password:
      <input id="confirm" name="confirm-password" type="password" required />
    </label><br />
    <label htmlFor="country">Country:
      <input id="country" name="country" type="text" required />
    </label><br />
    <div className="text-area-wrapper">
      <label htmlFor="address">Mailing address:</label>
      <textarea className="address-input" id="address" name="address" required />
    </div>
    <label htmlFor="zip_code">Zip code:
      <input id="zip_code" name="zip_code" type="text" required />
    </label><br />
    <div className="text-area-wrapper">
      <label htmlFor="secret_question">Secret question:</label>
      <textarea className="question-input" id="secret_question" name="secret_question" required />
    </div>
    <div className="text-area-wrapper">
      <label htmlFor="secret_answer">Secret answer:</label>
      <textarea className="answer-input" id="secret_answer" name="secret_answer" required />
    </div>
    <div className="join-button-wrapper">
      <button className="join-form-submit" type="submit">
        <p className="join-button-text">
          Sign Up
        </p>
      </button>
    </div>
  </form>;

  export default JoinForm;