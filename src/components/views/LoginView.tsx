import React, { useState } from 'react';
import { Redirect } from 'react-router';
import {api} from 'src';
import './LoginView.scss';
import {AppError} from 'src/types/global';

interface LoginViewProps {

}

const LoginView = ({}: LoginViewProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<AppError>({});

  const handleSubmit = () => {
    console.log('handleSubmit', email, password);

    if (email && password) {
      api
      .post("login", {
        email: email,
        password: password
      })
      .then((response) => {
        console.log("response", response);

        if (response.status) {
          localStorage.setItem(
            "token",
            response.data.data.user.api_token
          );

          localStorage.setItem(
            "user",
            JSON.stringify(response.data.data.user)
          );

          api.defaults.headers.common[
            "Authorization"
            ] = `Bearer ${localStorage.getItem("token")}`;

          setIsLoggedIn(true);
        } else {
          setErrors({
            error: true,
            type: 'api',
            msgs: response.data.errors
          });
        }
      })
      .catch((error) => {console.log("error", error);
        setErrors({
          error: true,
          type: 'api',
          msgs: [error.message]
        });
      });
    } else {
      setErrors({
        error: true,
        type: 'validation',
        msgs: [
          "You missed one of the required values please try again!"
        ]
      });
    }
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
