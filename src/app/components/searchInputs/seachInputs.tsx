import { ChangeEvent } from 'react';
import styles from './card.module.css';
import * as users from '../../../../users';

export default function SearchInputs(props: { callback: Function }) {
  const changeUser = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    props.callback(event.target.value);
  };

  return (
    // This is the Searh Inputs component
    <div>
        {/* TODO: Drop-down to select user */}
        {/* On selection, load the jobs for that person and fetch their exclusion strings*/}
        <select onChange={changeUser}>
          { users && users.map((user: {id: number, name: string}) => {
            <option key={user.id} value={user.name}>{user.name}</option>
          }}
        </select>

        {/* TODO: (2) Inputs with customizable exclusion strings */}
        {/* On change and debounce, save new strings to DB */}
    </div>
  );
}
