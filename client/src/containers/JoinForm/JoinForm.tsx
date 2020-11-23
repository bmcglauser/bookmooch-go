import React from 'react';
import './JoinForm.scss';

export default function JoinForm () : JSX.Element {
  return (
    <form className="join-form">
      <label htmlFor="username">Username (jsmith02):
        <input name="username" type="text" required />
      </label><br />
      <label htmlFor="display_name">Display name (Jane S):
        <input name="display_name" type="text" required />
      </label><br />
      <label htmlFor="email">E-mail address:
        <input name="email" type="text" required />
      </label><br />
      <label htmlFor="password">Password:
        <input name="password" type="password" required />
      </label><br />
      <label htmlFor="confirm-password">Confirm password:
        <input name="confirm-password" type="password" required />
      </label><br />
      <label htmlFor="country">Country:
        <input name="country" type="text" required />
      </label><br />
      <div className="text-area-wrapper">
        <label htmlFor="address">Mailing address:</label>
        <textarea className="address-input" name="address" required />
      </div>
      <label htmlFor="zip_code">Zip code:
        <input name="zip_code" type="text" required />
      </label><br />
      <div className="text-area-wrapper">
        <label htmlFor="secret_question">Secret question:</label>
        <textarea className="question-input" name="secret_question" required />
      </div>
      <div className="text-area-wrapper">
        <label htmlFor="secret_answer">Secret answer:</label>
        <textarea className="answer-input" name="secret_answer" required />
      </div>
      <div className="join-button-wrapper">
        <button className="join-form-submit" type="submit">
          <p className="join-button-text">
            Sign Up
          </p>
        </button>
      </div>
    </form>
  );
}