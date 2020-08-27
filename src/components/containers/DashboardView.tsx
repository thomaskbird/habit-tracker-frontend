import React, { useEffect, useState } from 'react';
import './DashboardView.scss';
import { Header } from '../partials/Header';
import { api } from '../../index';
import { Tracker, TrackerType } from 'src/types/global';
import { TrackerListItemView } from '../partials/TrackerListItemView';

const mock = [
  {
    id: 1,
    user_id: 1,
    name: 'Smoking',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto assumenda error laboriosam. Cumque est eveniet possimus reprehenderit vitae. Atque libero nam obcaecati pariatur quibusdam quod temporibus vero. Aliquid, mollitia, quia.',
    type: TrackerType.simple,
    tracker_items: [],
    created_at: '2020-08-22',
    updated_at: '2020-08-22',
    deleted_at: null,
  },
  {
    id: 2,
    user_id: 1,
    name: 'Kia Oil Change',
    description: 'Used for tracking last time an oil change was done',
    type: TrackerType.simple,
    tracker_items: [],
    created_at: '2020-08-19',
    updated_at: '2020-08-19',
    deleted_at: null,
  },
];

const DashboardView = () => {
  const [trackers, setTrackers] = useState<Tracker[]>(mock);

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
