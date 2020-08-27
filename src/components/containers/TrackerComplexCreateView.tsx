import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './TrackerComplexCreateView.scss';
import { api } from '../../index';

interface CustomFieldInputProps {
    id: number;
    name: string;
    onFieldChange(val: string): void;
}

const CustomFieldInput = ({
    id,
    name,
    onFieldChange,
}: CustomFieldInputProps) => {
    return (
        <div className={'FormGroup'}>
            <label htmlFor={`customFields-${id}`}>[{id}] Custom field name:</label>
            <input
                type={'text'}
                name={'customField[]'}
                id={`customFields-${id}`}
                value={name}
                onChange={e => onFieldChange(e.target.value)}
            />
        </div>
    );
};

const TrackerComplexCreateView = () => {
    const [name, setName] = useState<string>('');
    const [created, setCreated] = useState<boolean>(false);
    const [customFields, setCustomFields] = useState<any[]>([]);
    const [customFieldCount, setCustomFieldCount] = useState<number>(1);

    if(created) {
        return <Redirect to={'/dashboard'} />
    }

    const handleCreateTracker = () => {
        console.log('customFields', customFields);
        // api.post(
        //     '/tracker/create', {
        //         name,
        //         description,
        //         type,
        //     }
        // ).then(response => {
        //     setCreated(true);
        // }).catch(e => console.log('Error: ', e));
    };

    return (
        <div className={'TrackerComplexCreateView'}>
            <div className={'Row'}>
                <div className={'Column'}>
                    <h2>Create a tracker</h2>
                </div>
            </div>
            <div className={'Row'}>
                <div className={'Column Column-1'}>
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

                    <button
                        type="button"
                        onClick={() => {
                            setCustomFields([...customFields, {
                                id: customFieldCount,
                                name: '',
                                slug: '',
                            }]);
                            setCustomFieldCount(customFieldCount + 1);
                        }}
                    >
                        Add Custom Field
                    </button>
                    {customFields.map(customField => (
                        <CustomFieldInput
                            key={customField.id}
                            id={customField.id}
                            name={customField.name}
                            onFieldChange={(val) => {
                                setCustomFields(old => {
                                    const changedField = old.find(filter => filter.id === customField.id);
                                    return old.map(field => field.id !== customField.id ? field : {
                                        ...changedField,
                                        name: val,
                                        slug: val.toLowerCase().replace(/\s/g, '-')
                                    });
                                });
                            }}
                        />
                    )}
                </div>
            </div>
            <div className={'Row Stack Pin Pin__Bottom Footer'}>
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

export { TrackerComplexCreateView };
