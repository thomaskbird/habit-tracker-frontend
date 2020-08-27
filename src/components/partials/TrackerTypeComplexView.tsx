import React from 'react';
import moment from 'moment';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { TrackerComplexItem } from '../../types/global';

interface TrackerTypeComplexViewProps {
    chartData: any[];
    trackerItems: TrackerComplexItem[];
    onDeleteTrackerItem(id: number): void;
}

const TrackerTypeComplexView = ({
    chartData,
    trackerItems,
    onDeleteTrackerItem,
}: TrackerTypeComplexViewProps) => {
    return (
        <div className={'TrackerTypeComplexView'}>
            {chartData ? (
                <div className={'TrackerView__chart'}>
                    <ResponsiveContainer>
                        <BarChart
                            data={chartData}
                            margin={{
                                top: 0, right: 40, left: 0, bottom: 0,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="id" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" fill="#999" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            ) : undefined}

            {trackerItems && trackerItems.map(item => (
                <div className={'Row TrackerView__item'} key={item.id}>
                    <div className={'Column Column-2'}>
                        ${item.amount}
                    </div>
                    <div className={'Column Column-2'}>
                        {item.hours}hrs
                    </div>
                    <div className={'Column Column-14'}>
                        {moment(item.created_at).format('YYYY-MM-DD HH:mm:ss')}
                    </div>
                    <div className={'Column Column-2'}>
                        <button
                            onClick={() => onDeleteTrackerItem(item.id)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
};

export { TrackerTypeComplexView };
