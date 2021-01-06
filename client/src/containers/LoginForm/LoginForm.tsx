import React, { FunctionComponent } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginForm.scss';


const LoginForm: FunctionComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form className='login-form'>
      <label htmlFor='username'>Username</label>
      <input onChange={(e) => setUsername(e.target.value)} value={username} id='username' name='username' type='text' required/>
      <label htmlFor='password'>Password</label>
      <input onChange={(e) => setPassword(e.target.value)} value={password} id='password' name='password' type='password' required/>
      <Link to={`/controller/login/x/${username}/${password}`} style={{textDecoration:'none'}}>
        <button>
          <p>
            Log in
          </p>
        </button>
      </Link>
    </form>
  );
}

export default LoginForm;