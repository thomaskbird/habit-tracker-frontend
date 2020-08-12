import React from 'react';
import { Header } from './Header';

import { Route, Switch } from 'react-router';

import { DashboardView } from '../containers/DashboardView';
import { TrackerCreateView } from '../containers/TrackerCreateView';

interface AuthenticatedWrapperProps {
  children: any;
}

const AuthenticatedWrapper = ({ children }: AuthenticatedWrapperProps) => {
  return (
    <div className={'AuthenticatedWrapper Container'}>
      <Header />

      <Switch>
        <Route
          path={'/dashboard'}
          component={DashboardView}
        />
        <Route
          path={'/tracker/create'}
          component={TrackerCreateView}
        />
      </Switch>
    </div>
  );
}

export { AuthenticatedWrapper };
