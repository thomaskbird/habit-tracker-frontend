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
import {TrackerSimpleItem} from 'src/types/global';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { triggerPrompt } from '../../utils/utils';

interface TrackerTypeSimpleViewProps {
  chartData: any[];
  trackerItems: TrackerSimpleItem[];
  onDeleteTrackerItem(id: number): void;
}

const TrackerTypeSimpleView = ({
  chartData,
  trackerItems,
  onDeleteTrackerItem,
}: TrackerTypeSimpleViewProps) => {
  return (
    <>
      {chartData ? (
        <div className={'TrackerView__chart'}>
          <ResponsiveContainer>
            <BarChart
              data={chartData}
              margin={{
                top: 5, right: 30, left: 20, bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray={'3 3'} />
              <XAxis dataKey={'label'} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey={'count'} fill={'#999'} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : undefined}

      {trackerItems.map(item => (
        <div className={'TrackerView__item'} key={item.id}>
          {moment(item.created_at).format('YYYY-MM-DD HH:mm:ss')}
          &nbsp;
          <button
            className={'Btn Btn__small Btn__Danger Btn__icon Btn__icon--left'}
            onClick={() => {
              const confirm = triggerPrompt('Are you sure you want to delete?');
              if(confirm) {
                onDeleteTrackerItem(item.id)
              }
            }}
          >
            <FontAwesomeIcon icon={'times'} />
            &nbsp;Delete
          </button>
        </div>
      ))}
    </>
  )
}

export { TrackerTypeSimpleView };
