import React, { useEffect, useState } from 'react';
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

interface TrackerViewProps extends RouteComponentProps {
  match: any;
}

const TrackerView = ({
  match,
}: TrackerViewProps) => {
  const [tracker, setTracker] = useState<Tracker | undefined>(undefined);
  const [chartData, setChartData] = useState<any>(null);

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
      setTracker(response.data.payload.tracker);

      buildChartData(response.data.payload.tracker_items);
    }).catch(e => console.log('Error: ', e));
  };

  const deleteTrackerItem = (trackerItemId: number) => {
    api.get(`/tracker-item/remove/${trackerItemId}`).then(response => {
      getTracker();
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

      {chartData ? (
        <div className={'TrackerView__chart'}>
          <ResponsiveContainer>
            <BarChart
              data={chartData}
              margin={{
                top: 5, right: 30, left: 20, bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="id" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : undefined}

      {tracker.tracker_items.map(item => (
        <div className={'TrackerView__item'} key={item.id}>
          {moment(item.created_at).format('YYYY-MM-DD HH:mm:ss')}
          &nbsp;
          <button
            onClick={() => deleteTrackerItem(item.id)}
          >Delete</button>
        </div>
      ))}

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
