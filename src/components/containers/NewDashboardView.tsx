import React, { useEffect, useState } from 'react';
import './DashboardView.scss';
import { api } from '../../index';
import { Tracker } from 'src/types/global';
import { TrackerTypeSimpleNewFormat } from '../partials/TrackerTypeSimpleNewFormat';

const NewDashboardView = () => {
    const [trackers, setTrackers] = useState<Tracker[]>([]);

    const getTrackers = () => {
        api.get(`/trackers/new-format`).then(response => {
            setTrackers(old => old !== response.data.payload.trackers ? response.data.payload.trackers : old);
        }).catch(e => console.log('Error: ', e));
    };

    const deleteTrackerItem = (trackerItemId: number) => {
        api.get(`/tracker-item/remove/${trackerItemId}`).then(response => {
            getTrackers();
        }).catch(e => console.log('Error: ', e));
    };

    useEffect(() => {
        getTrackers();
    }, []);

    console.log('trackers', trackers);

    return (
        <div className={'Container DashboardView'}>
            <div className={'Row'}>
                <div className={'Column Column-1'}>
                    <h2>Facelift Dashboard</h2>

                    {trackers.map(tracker => (
                        <TrackerTypeSimpleNewFormat
                          key={tracker.id}
                          trackerName={tracker.name}
                          chartData={tracker.chart_data}
                          trackerItems={tracker.tracker_items}
                          onDeleteTrackerItem={id => deleteTrackerItem(id)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export { NewDashboardView };
