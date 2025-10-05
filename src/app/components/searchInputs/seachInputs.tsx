'use client'
import styles from "./searchInputs.module.css";
import { ChangeEvent } from 'react';
import React from 'react';
import { IUser } from '../../../../types';
import mockUsers from '../../../../users';

export default function SearchInputs(props: { callback: (user: IUser) => void }) {
  const emptyInitialUsers: IUser[] = [];
  const emptyInitialUser: IUser = {
    id: -1,
    name: '',
    titleExclusions: [],
    contentExclusions: []
  };

  const [users, setUsers] = React.useState(emptyInitialUsers);
  const [selectedUser, setSelectedUser] = React.useState(emptyInitialUser);
  const [titleExclusions, setTitleExclusions] = React.useState('');
  const [contentExclusions, setContentExclusions] = React.useState('');

  // only fetch users on mount
  React.useEffect(() => {
    fetchUsers();
  }, [])

  const changeUser = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const foundUser = users?.find((user) => user.name === event.target.value);
    if (foundUser) {
      setSelectedUser(foundUser);
      setTitleExclusions(foundUser.titleExclusions.join(', '));
      setContentExclusions(foundUser.contentExclusions.join(', '));
      props.callback(foundUser);
    } else {
      resetState();
    }
  }

  const changeTitleExclusions = (event: ChangeEvent<HTMLInputElement>) => {
    setTitleExclusions(event.target.value);
    // TODO: debounce, join(', ') & save to DB
  }

  const changeContentExclusions = (event: ChangeEvent<HTMLInputElement>) => {
    setContentExclusions(event.target.value);
    // TODO: debounce, join(', ') & save to DB
  }

  const fetchUsers = async () => {
    // `/api/` is prepended because that's a //file// Route that NextJS has permission to route to
    // `/get-users` is used to route the request furhter, within the code
    // setUsers(JSON.parse(await GET(new Request('/api/get-users')).then(async (response: Response) => {
    //   return response.json();
    // })));
    setUsers(mockUsers);
  };

  const resetState = () => {
    setSelectedUser(emptyInitialUser);
    setTitleExclusions('');
    setContentExclusions('');
  }

  return (
    // This is the Search Inputs component
    <div className={styles.searchInputComponent}>
        <div className={styles.userSelect}>
          {/* Drop-down to select user */}
          {/* On selection, load the jobs for that person and fetch their exclusion strings*/}
          <label htmlFor="userSelect">User: </label>
          <select name="userSelect" onChange={changeUser}>
            <option key="-1" value="null">Select a User</option>
            {
              users && users?.map((user: {id: number, name: string}) => {
                return <option key={user.id} value={user.name}>{user.name}</option>
              })
            }
          </select>
        </div>
        <div>
          {/* (2) Inputs for customizable exclusion strings */}
          {/* On change debounce, then save new strings to DB */}
          <div className={styles.inputSet}>
            <label htmlFor="titleExclusions">Title Keyword Exclusions: </label>
            {/* data-ddg-inputtype="unknown" because LastPass changes the inputs and causes React warnings*/}
            <input id="titleExclusions" disabled={selectedUser.id > -1} name="titleExclusions" type="text" value={titleExclusions} onChange={changeTitleExclusions} data-ddg-inputtype="unknown"/>
          </div>
          <small>Comma-space separated string</small>
          <div className={styles.inputSet}>
            <label htmlFor="contentExclusions">Listing Content Keyword Exclusions: </label>
            {/* data-ddg-inputtype="unknown" because LastPass changes the inputs and causes React warnings*/}
            <input id="contentExclusions" disabled={selectedUser.id > -1} name="contentExclusions" type="text" value={contentExclusions} onChange={changeContentExclusions} data-ddg-inputtype="unknown"/>
          </div>
          <small>Comma-space separated string</small>
        </div>
    </div>
  );
}
