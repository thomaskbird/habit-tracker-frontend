import React from 'react';
import './Subheader.scss';

interface SubheaderProps {
  children: any;
}

const Subheader = ({
  children,
}: SubheaderProps) => {
  return (
    <div className={'Subheader'}>
      {children}
    </div>
  );
};

export { Subheader };
