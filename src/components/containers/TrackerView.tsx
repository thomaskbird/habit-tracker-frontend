import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import {Link} from 'react-router-dom';
import moment from 'moment';

import { Tracker, TrackerComplexItem, TrackerType } from 'src/types/global';
import {RouteComponentProps} from 'react-router';
import {api} from 'src';

import './TrackerView.scss';
import { Subheader } from '../partials/Subheader';
import {TrackerTypeSimpleView} from '../partials/TrackerTypeSimpleView';
import { TrackerTypeComplexView } from '../partials/TrackerTypeComplexView';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { triggerPrompt } from '../../utils/utils';

interface TrackerViewProps extends RouteComponentProps {
  match: any;
}

const mockTrackerItems: TrackerComplexItem[] = [
  {
    id: 1,
    tracker_id: 1,
    amount: 5,
    hours: 2,
    created_at: '2020-08-22 20:08:09',
    updated_at: '2020-08-22',
    deleted_at: null,
  },
  {
    id: 2,
    tracker_id: 1,
    amount: 10,
    hours: 3,
    created_at: '2020-08-20 08:08:09',
    updated_at: '2020-08-22',
    deleted_at: null,
  },
  {
    id: 3,
    tracker_id: 1,
    amount: 7,
    hours: 5,
    created_at: '2020-08-19 12:08:09',
    updated_at: '2020-08-22',
    deleted_at: null,
  },
];

const mockTracker = {
    id: 1,
    user_id: 1,
    name: 'Smoking',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto assumenda error laboriosam. Cumque est eveniet possimus reprehenderit vitae. Atque libero nam obcaecati pariatur quibusdam quod temporibus vero. Aliquid, mollitia, quia.',
    type: TrackerType.simple,
    tracker_items: mockTrackerItems,
    created_at: '2020-08-22',
    updated_at: '2020-08-22',
    deleted_at: null,
};

const mockChartData = [
  {
    id: 22,
    count: 3,
  },
  {
    id: 21,
    count: 6,
  },
  {
    id: 20,
    count: 0,
  },
  {
    id: 19,
    count: 8,
  },
  {
    id: 18,
    count: 4,
  },
  {
    id: 17,
    count: 3,
  },
  {
    id: 16,
    count: 11,
  },
];

const TrackerView = ({
  match,
}: TrackerViewProps) => {
  const [tracker, setTracker] = useState<Tracker | undefined>(mockTracker);
  const [chartData, setChartData] = useState<any>(mockChartData);
  const [redirect, setRedirect] = useState<boolean>(false);

  const addTrackerItem = () => {
    api.post(`/tracker-item/create/${match.params.id}`).then(response => {
      getTracker();
    }).catch(e => console.log('Error: ', e));
  };

  const buildChartData = (trackerItems: any) => {
    const period = 7;
    const range = [];

    for(let i = 0; i < 7; i++) {
      const day = moment().subtract(i, 'd').format('D');
      const count = trackerItems[day] !== undefined ? trackerItems[day].length : 0;

      range.push({
        id: day,
        count: count,
      });
    }

    setChartData(range.reverse());
  }

  const getTracker = () => {
    api.get(`/trackers/${match.params.id}`).then(response => {
      setTracker(response.data.payload.tracker);
      buildChartData(response.data.payload.tracker_items);
    }).catch(e => console.log('Error: ', e));
  };

  const deleteTracker = () => {
    api.get(`/trackers/remove/${match.params.id}`).then(response => {
      setRedirect(true);
    }).catch(e => console.log('Error: ', e));
  }

  const deleteTrackerItem = (trackerItemId: number) => {
    api.get(`/tracker-item/remove/${trackerItemId}`).then(response => {
      getTracker();
    }).catch(e => console.log('Error: ', e));
  };

  useEffect(() => {
    getTracker();
  }, []);

  return tracker ? redirect ? (
    <Redirect to={'/dashboard'} />
  ) : (
    <div className={'TrackerView Container'}>
      <Subheader>
        <Link to={'/dashboard'}>
          <FontAwesomeIcon icon={'chevron-left'} />
        </Link>
        <button
          type="button"
          className={'Btn Btn__medium Btn__Danger'}
          onClick={() => {
            const confirm = triggerPrompt(`Are you sure you want to delete ${tracker.name}?`);
            if(confirm) {
              deleteTracker();
            }
          }}
        >
          Tracker <FontAwesomeIcon icon={'times'} />
        </button>
      </Subheader>

      <h2>
        {tracker.name}
        <small>{tracker.type}</small>
      </h2>
      <p>{tracker.description}</p>

      {TrackerType.simple === tracker.type ? (
        <TrackerTypeSimpleView
            chartData={chartData}
            trackerItems={tracker.tracker_items}
            onDeleteTrackerItem={id => deleteTrackerItem(id)}
        />
      ): (
          <TrackerTypeComplexView
            chartData={chartData}
            trackerItems={tracker.tracker_items}
            onDeleteTrackerItem={id => deleteTrackerItem(id)}
          />
      )}

      <div className={'Row Stack Pin Pin__Bottom'}>
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
