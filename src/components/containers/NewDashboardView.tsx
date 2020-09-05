import React, { useEffect, useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import './NewDashboardView.scss';
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

    const addTrackerItem = (id: number) => {
        api.post(`/tracker-item/create/${id}`).then(response => {
            getTrackers();
        }).catch(e => console.log('Error: ', e));
    };

    const deleteTracker = (id: number) => {
        api.get(`/trackers/remove/${id}`).then(response => {
            getTrackers();
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

    return (
        <div className={'Container NewDashboardView'}>
            <div className={'Row'}>
                <div className={'Column Column-1'}>
                    <SwipeableViews
                        enableMouseEvents={true}
                    >
                    {trackers.map(tracker => (
                        <TrackerTypeSimpleNewFormat
                          key={tracker.id}
                          tracker={tracker}
                          chartData={tracker.chart_data.reverse()}
                          trackerItems={tracker.tracker_items}
                          onAddTrackerItem={() => addTrackerItem(tracker.id)}
                          onDeleteTracker={() => deleteTracker(tracker.id)}
                          onDeleteTrackerItem={id => deleteTrackerItem(id)}
                        />
                    ))}
                    </SwipeableViews>
                </div>
            </div>
        </div>
    );
};

export { NewDashboardView };
