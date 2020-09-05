import React from 'react';
import { Header } from './Header';

import { Route, Switch } from 'react-router';

import { NewDashboardView } from '../containers/NewDashboardView';
import { TrackerCreateView } from '../containers/TrackerCreateView';
import { TrackerComplexCreateView } from '../containers/TrackerComplexCreateView';
import { TrackerView } from '../containers/TrackerView';

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
          component={NewDashboardView}
        />
        <Route
          path={'/tracker/create'}
          component={TrackerCreateView}
        />
          <Route
              path={'/tracker/complex/create'}
              component={TrackerComplexCreateView}
          />
        <Route
          path={'/tracker/:id'}
          component={TrackerView}
        />
      </Switch>
    </div>
  );
}

export { AuthenticatedWrapper };
