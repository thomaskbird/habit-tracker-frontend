import React from 'react';
import { Link } from 'react-router-dom';

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
        <Link to={'/tracker/create'}>+</Link>
      </div>
    </div>
  )
};

export { Header };
