import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginForm.scss';
import LoginController from './LoginController';
// import LoginUser from '../../services/queryService';



function handler (e, ctx) {
  return <LoginController formEvent={e} ctx={ctx} />
}

export default function LoginForm (ctx) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className='login-form'>
      <label htmlFor='username'>Username</label>
      <input onChange={(e) => setUsername(e.target.value)} value={username} name='username' type='text' required/>
      <label htmlFor='password'>Password</label>
      <input onChange={(e) => setPassword(e.target.value)} value={password} name='password' type='password' required/>
      <Link to={`/logincontroller/${username}/${password}`} style={{textDecoration:'none'}}>
        <button>
          <p>
            Log in
          </p>
        </button>
      </Link>
    </div>
  )
}