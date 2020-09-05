import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
  <Link to={`/tracker/${tracker.id}`}>
    <div className={'Row Tracker'}>
      <div className={'Column Column-1'}>
        <h3>{tracker.name}</h3>
        <p className={'note'}>{tracker.description}</p>
      </div>
      <div className={'Column Tracker__icon'}>
        <FontAwesomeIcon icon={'chevron-right'} />
      </div>
    </div>
  </Link>
  );
};

export { TrackerListItemView };
