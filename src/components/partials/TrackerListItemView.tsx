import React from 'react';
import {Tracker} from 'src/types/global';
import {Link} from 'react-router-dom';

import './TrackerListItemView.scss';

interface TrackerListItemViewProps {
  tracker: Tracker;
}

const TrackerListItemView = ({
  tracker
}: TrackerListItemViewProps) => {
  return (
    <div className={'Row Tracker'}>
      <div className={'Column'}>
        <Link to={`/tracker/${tracker.id}`}>
          <h3>{tracker.name}</h3>
        </Link>
        <p className="note">{tracker.description}</p>
      </div>
    </div>
  );
};

export { TrackerListItemView };
