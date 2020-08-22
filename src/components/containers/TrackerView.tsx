import React, { useEffect, useState } from 'react';
import { Redirect } from "react-router";
import {Link} from 'react-router-dom';
import moment from 'moment';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

import { Tracker } from 'src/types/global';
import {RouteComponentProps} from 'react-router';
import {api} from 'src';

import './TrackerView.scss';
import {TrackerTypeSimpleView} from '../partials/TrackerTypeSimpleView';

interface TrackerViewProps extends RouteComponentProps {
  match: any;
}

const TrackerView = ({
  match,
}: TrackerViewProps) => {
  const [tracker, setTracker] = useState<Tracker | undefined>(undefined);
  const [chartData, setChartData] = useState<any>(null);
  const [redirect, setRedirect] = useState<boolean>(false);

  const addTrackerItem = () => {
    api.post(`/tracker-item/create/${match.params.id}`).then(response => {
      getTracker();
    }).catch(e => console.log('Error: ', e));
  };

  const buildChartData = (tracker_items: any) => {
    const period = 7;
    const range = [];

    for(let i = 0; i < 7; i++) {
      const day = moment().subtract(i, 'd').format('D');
      const count = tracker_items[day] !== undefined ? tracker_items[day].length : 0;

      range.push({
        id: day,
        count: count,
      });
    }

    setChartData(range.reverse());
  }

  const getTracker = () => {
    api.get(`/trackers/${match.params.id}`).then(response => {
      console.log('response', response);
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
    <div
      className={'TrackerView Container'}
    >
      <div className={'Subheader'}>
        <Link to={'/dashboard'}>Back</Link>
      </div>

      <h2>
        {tracker.name}
        <small>{tracker.type}</small>
        <button
          type="button"
          onClick={() => deleteTracker()}
        >
          Delete
        </button>
      </h2>
      <p>{tracker.description}</p>

      <TrackerTypeSimpleView
        chartData={chartData}
        trackerItems={tracker.tracker_items}
        onDeleteTrackerItem={id => deleteTrackerItem(id)}
      />

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
