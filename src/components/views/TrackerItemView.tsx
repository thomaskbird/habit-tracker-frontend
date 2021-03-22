import React from 'react';
import { Redirect, RouteComponentProps } from 'react-router';
import { api } from '../../index';
import { TrackerSimpleItem } from '../../types/global';

interface Props extends RouteComponentProps {

}

const COMPONENT_NAME = 'TrackerItemView';

const TrackerItemView = ({ match }: Props) => {
  const [trackerItem, setTrackerItem] = React.useState<TrackerSimpleItem | undefined>(undefined);
  const [redirect, setRedirect] = React.useState<boolean>(false);
  const [note, setNote] = React.useState<string>('');
  const [createdAt, setCreatedAt] = React.useState<string>('');

  React.useEffect(() => {
      api.get(`/tracker-item/${(match.params as any).id}`).then(response => {
          setTrackerItem(response.data.payload.tracker_item);
          setCreatedAt(response.data.payload.tracker_item.created_at);
          setNote(response.data.payload.tracker_item.note !== null ? response.data.payload.tracker_item.note : '');
      }).catch(e => console.log('Error: ', e));
  }, []);

  const handleSubmit = () => {
      const body = note !== '' ? { note: note } : {};

      return api.post(`/tracker-item/update/${trackerItem!.id}`, body).then(response => {
          setRedirect(true);
      }).catch(e => {
          console.log('Error: ', e);
      });
  };

  return redirect ? (
      <Redirect to={'/dashboard'} />
  ) : (
    <div className={`${COMPONENT_NAME}`}>
        {redirect ? 'true' : 'false'}
        <h3>Tracker Item</h3>

        <div className={'FormGroup'}>
            <label htmlFor="created_at">Created:</label>
            <input
                id="created_at"
                type={'text'}
                name={'created_at'}
                value={createdAt}
                onChange={e => setCreatedAt(e.target.value)}
            />
        </div>

        <div className={'FormGroup'}>
            <label htmlFor="note">Note:</label>
            <textarea
                id="note"
                name={'note'}
                value={note}
                onChange={e => setNote(e.target.value)}
            />
        </div>

        <button
            type="button"
            className={'Btn Btn__Primary'}
            onClick={() => handleSubmit()}
        >
            Update
        </button>
    </div>
  );
};

export { TrackerItemView };
