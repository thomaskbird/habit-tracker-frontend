import React, { useEffect, useState } from 'react';
import './DashboardView.scss';
import { api } from '../../index';
import { Tracker, TrackerType } from 'src/types/global';
import { TrackerListItemView } from '../partials/TrackerListItemView';

const DashboardView = () => {
  const [trackers, setTrackers] = useState<Tracker[]>([]);

  useEffect(() => {
    api.get('/trackers').then(response => {
      setTrackers(response.data.payload.trackers);
    }).catch(e => console.log('Error: ', e));
  }, []);

  return (
    <div className={'Container DashboardView'}>
      <div className={'Row'}>
        <div className={'Column Column-1'}>
          <h2>Dashboard</h2>

          {trackers.map(tracker => (
            <TrackerListItemView
              key={tracker.id}
              tracker={tracker}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export { DashboardView };
