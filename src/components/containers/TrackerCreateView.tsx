import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './TrackerCreateView.scss';
import { api } from '../../index';

const TrackerCreateView = () => {
  const [name, setName] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [created, setCreated] = useState<boolean>(false);

  if(created) {
    return <Redirect to={'/dashboard'} />
  }

  const handleCreateTracker = () => {
    api.post(
      '/tracker/create', {
        name,
        description,
        type,
      }
    ).then(response => {
      setCreated(true);
    }).catch(e => console.log('Error: ', e));
  };

  return (
    <div className={'TrackerCreateView'}>
      <div className={'Row'}>
        <div className={'Column'}>
          <div className={'FormGroup'}>
            <label htmlFor={'name'}>Name:</label>
            <input
              type={'text'}
              name={'name'}
              id={'name'}
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          <p className="note">The type of tracker is dependent on what you want to do, if you simply want to track when you do something once pick the "Simple counter". If you're wanting to keep track of maybe a duration or something like that select "Complex value"</p>

          <div className={'FormGroup'}>
            <label htmlFor={'type'}>Type:</label>
            <select
              name={'type'}
              id={'type'}
              value={type}
              onChange={e => setType(e.target.value)}
            >
              <option>Select one...</option>
              <option value="simple">Simple counter</option>
              <option value="simple-complex">Complex Value</option>
            </select>
          </div>

          <div className={'FormGroup'}>
            <label htmlFor={'description'}>Description:</label>
            <textarea
              name={'description'}
              id={'description'}
              value={description}
              onChange={e => setDescription(e.target.value)}
            ></textarea>
          </div>
        </div>
      </div>
      <div className={'Row Stack'}>
        <button
          type="button"
          className={'Btn Btn__Primary Column'}
          onClick={() => handleCreateTracker()}
        >
          Create
        </button>

        <Link
          to={'/dashboard'}
          className={'Btn Btn__Default Column'}
        >
          Cancel
        </Link>
      </div>
    </div>
  )
}

export { TrackerCreateView };
