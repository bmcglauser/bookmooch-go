import './LoginForm.scss';

export default function LoginForm (props) {
  return (
    <form className='login-form'>
      <label htmlFor='username'>Username</label>
      <input name='username' type='text' required/>
      <label htmlFor='password'>Password</label>
      <input name='password' type='password' required/>
      <button type='submit'>
        <p>
          Log in
        </p>
      </button>
    </form>
  )
}