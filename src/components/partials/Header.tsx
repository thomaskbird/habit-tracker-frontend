import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import './Header.scss';

interface HeaderProps {}

const Header = ({}: HeaderProps) => {
  return (
    <div className={'Header'}>
      <div className={'Header__Icon Header__Icon--Left'}>

      </div>
      <div className={'Header__Logo'}>
        <Link to={'/dashboard'}>
          <h2>Easy Track</h2>
        </Link>
      </div>
      <div className={'Header__Icon Header__Icon--Right'}>
        <Link to={'/tracker/create'}>
          <FontAwesomeIcon icon={"plus"} />
        </Link>
        <Link
          to={'/'}
          onClick={() => {
            localStorage.removeItem('token');
          }}
        >
          <FontAwesomeIcon icon={"sign-out-alt"} />
        </Link>
      </div>
    </div>
  )
};

export { Header };
