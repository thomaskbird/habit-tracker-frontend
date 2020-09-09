import React, { useEffect, useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import './NewDashboardView.scss';
import { api } from '../../index';
import { Tracker } from 'src/types/global';
import { TrackerTypeSimpleNewFormat } from '../partials/TrackerTypeSimpleNewFormat';

const NewDashboardView = () => {
    const [trackers, setTrackers] = useState<Tracker[]>([]);
    const [rangeSelected, setRangeSelected] = useState<number>(7);

    const getTrackers = (range: number) => {
        api.get(`/trackers/${range}`).then(response => {
            setTrackers(old => old !== response.data.payload.trackers ? response.data.payload.trackers : old);
        }).catch(e => console.log('Error: ', e));
    };

    const addTrackerItem = (id: number) => {
        return api.post(`/tracker-item/create/${id}`).then(response => {
            getTrackers(rangeSelected);
            return Promise.resolve(true);
        }).catch(e => {
            console.log('Error: ', e);
            return Promise.resolve(false);
        });
    };

    const deleteTracker = (id: number) => {
        api.get(`/trackers/remove/${id}`).then(response => {
            getTrackers(rangeSelected);
        }).catch(e => console.log('Error: ', e));
    };

    const deleteTrackerItem = (trackerItemId: number) => {
        api.get(`/tracker-item/remove/${trackerItemId}`).then(response => {
            getTrackers(rangeSelected);
        }).catch(e => console.log('Error: ', e));
    };

    useEffect(() => {
        getTrackers(rangeSelected);
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
                          onRangeChange={id => {
                              setRangeSelected(id);
                              getTrackers(id);
                          }}
                          onAddTrackerItem={async () => addTrackerItem(tracker.id)}
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
