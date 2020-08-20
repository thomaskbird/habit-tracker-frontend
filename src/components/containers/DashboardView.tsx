import React, { useEffect, useState } from 'react';
import './DashboardView.scss';
import { Header } from '../partials/Header';
import { api } from '../../index';
import { Tracker } from 'src/types/global';
import { TrackerListItemView } from '../partials/TrackerListItemView';

const DashboardView = () => {
  const [trackers, setTrackers] = useState<Tracker[]>([]);

  useEffect(() => {
    api.get('/trackers').then(response => {
      console.log('response.data.payload.trackers', response.data.payload.trackers);
      setTrackers(response.data.payload.trackers);
    }).catch(e => console.log('Error: ', e));
  }, []);

  return (
    <div className={'Container DashboardView'}>
      <div className={'Row'}>
        <div className={'Column'}>
          <h2>Dashboard</h2>

          {trackers.map(tracker => (
            <TrackerListItemView
              key={tracker.id}
              tracker={tracker}
            />
          ))}
        </div>
        <div className={'Column Column-8'}>

        </div>
      </div>
    </div>
  );
};

export { DashboardView };
