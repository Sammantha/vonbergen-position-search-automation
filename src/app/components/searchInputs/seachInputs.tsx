'use client'
import { ChangeEvent } from 'react';
import mockUsers from '../../../../users';
import React from 'react';
import { IUser } from '../../../../types';
import { debounce } from '../../../../utils';

interface IState {
  list: IUser[];
}

export default function SearchInputs(props: { callback: Function }) {
  const initialUsers: IState = { list: [] };

  const [users, setUsers] = React.useState(initialUsers);
  const [selectedUser, setSelectedUser] = React.useState(initialUsers?.list[0]);
  const [titleExclusions, setTitleExclusions] = React.useState('');
  const [contentExclusions, setContentExclusions] = React.useState('');

  const fetchUsers = () => {
    setUsers({list: mockUsers});
  }

  // only fetch users on mount
  React.useEffect(() => {
    fetchUsers();
  }, [])

  const changeUser = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const foundUser = users.list?.find((user) => user.name === event.target.value);
    if (foundUser) {
      setSelectedUser(foundUser);
      setTitleExclusions(foundUser?.titleExclusions.join(', '));
      setContentExclusions(foundUser?.contentExclusions.join(', '));
      props.callback(foundUser.id);
    } else {
      setTitleExclusions('');
      setContentExclusions('');
      setSelectedUser(initialUsers?.list[0]);
    }
  };

  const changeTitleExclusions = (event: string) => {
    setTitleExclusions(event);
    // TODO: join(', ') & save to DB
  }

  const changeContentExclusions = (event: string) => {
    setContentExclusions(event);
    // TODO: join(', ') & save to DB
  }

  return (
    // This is the Search Inputs component
    <div>
        <div>
          {/* Drop-down to select user */}
          {/* On selection, load the jobs for that person and fetch their exclusion strings*/}
          <label>User:</label>
          <select onChange={changeUser}>
            <option key="-1" value="null">Select an Option</option>
            {
              users && users.list?.map((user: {id: number, name: string}) => {
                return <option key={user.id} value={user.name}>{user.name}</option>
              })
            }
          </select>
        </div>
        <div>
          {/* (2) Inputs with customizable exclusion strings */}
          {/* On change debounce, then save new strings to DB */}
          <label>Title Keyword Exclusions:</label>
          <input disabled={!selectedUser} value={titleExclusions} onKeyUp={debounce((e: string) => changeTitleExclusions(e))}/>
          <small>Comma-space separated strings</small>

          <label>Listing Content Keyword Exclusions:</label>
          <input disabled={!selectedUser} value={contentExclusions} onKeyUp={debounce((e: string) => changeContentExclusions(e))}/>
          <small>Comma-space separated strings</small>
        </div>
    </div>
  );
}
