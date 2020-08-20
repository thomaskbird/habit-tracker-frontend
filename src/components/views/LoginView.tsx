import React, { useState } from 'react';
import { Redirect } from 'react-router';
import './LoginView.scss';

interface LoginViewProps {

}

const LoginView = ({}: LoginViewProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = () => {
    console.log('handleSubmit', email, password);
    setIsLoggedIn(true);
  };

  if(isLoggedIn) {
    return <Redirect to={'/dashboard'} />
  }

  return (
    <div className={'LoginView'}>
      <div className={'FormGroup'}>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type={'text'}
          name={'email'}
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>

      <div className={'FormGroup'}>
        <label htmlFor="password">Password:</label>
        <input
          id={'password'}
          type={'password'}
          name={'password'}
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>

      <button
        type="button"
        className={'Btn Btn__Primary'}
        onClick={() => handleSubmit()}
      >
        Login
      </button>
    </div>
  );
};

export { LoginView };
