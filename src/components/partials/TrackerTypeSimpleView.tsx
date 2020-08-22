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
import {TrackerItem} from 'src/types/global';

interface TrackerTypeSimpleViewProps {
  chartData: any[];
  trackerItems: TrackerItem[];
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
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="id" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#75a6bd" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : undefined}

      {trackerItems.map(item => (
        <div className={'TrackerView__item'} key={item.id}>
          {moment(item.created_at).format('YYYY-MM-DD HH:mm:ss')}
          &nbsp;
          <button
            onClick={() => onDeleteTrackerItem(item.id)}
          >Delete</button>
        </div>
      ))}
    </>
  )
}

export { TrackerTypeSimpleView };
