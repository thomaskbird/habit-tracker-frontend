import React, { useEffect, useState } from 'react';
import { Tracker } from 'src/types/global';
import {RouteComponentProps} from 'react-router';
import {api} from 'src';

import './TrackerView.scss';

interface TrackerViewProps extends RouteComponentProps {
  match: any;
}

const TrackerView = ({
  match,
}: TrackerViewProps) => {
  const [tracker, setTracker] = useState<Tracker | undefined>(undefined);

  const addTrackerItem = () => {
    api.post(`/tracker-item/create/${match.params.id}`).then(response => {
      getTracker();
    }).catch(e => console.log('Error: ', e));
  };

  const getTracker = () => {
    api.get(`/trackers/${match.params.id}`).then(response => {
      setTracker(response.data.payload.tracker);
    }).catch(e => console.log('Error: ', e));
  };

  useEffect(() => {
    getTracker();
  }, []);

  return tracker ? (
    <div
      className={'TrackerView Container'}
    >
      <h2>{tracker.name} <small>{tracker.type}</small></h2>
      <p>{tracker.description}</p>

      {tracker.tracker_items.map(item => (
        <div className={'instance'} key={item.id}>
          {item.created_at}
        </div>
      ))}

      <div className={'Row Stack'}>
        <button
          type="button"
          className={'Btn Btn__Primary Column'}
          onClick={() => addTrackerItem()}
        >
          Add
        </button>
      </div>
    </div>
  ) : (
    <h2>Loading...</h2>
  );
};

export { TrackerView };
