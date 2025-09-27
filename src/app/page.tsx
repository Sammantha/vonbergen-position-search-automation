'use client';
import styles from "./page.module.css";
import mockedJobs from "../../positions";
import Card from "./components/card/card";
import React from "react";
import SearchInputs from "./components/searchInputs/seachInputs";
import { IJobListing, IUser } from "../../types";

export default function Home() {
  const initialEmptyJobs: IJobListing[] = [];
  const initialUser: IUser = {
    id: -1,
    name: '',
    titleExclusions: [],
    contentExclusions: []
  };

  const [selectedUser, setSelectedUser] = React.useState(initialUser);
  const [jobs, setJobs] = React.useState(initialEmptyJobs);

  const setUserFetchJobs = (user: IUser) => {
    setSelectedUser(user);
    setJobs(fetchJobs(user.id));
  };

  const fetchJobs = (id: number): IJobListing[] => {
    return mockedJobs.filter((job: IJobListing) => job.userId === id);
  };

  return (
    <div className={styles.page}>
      <header>
        <h1>VonBergen Job Search Automation</h1>
      </header>
      <main className={styles.main}>
        <SearchInputs callback={setUserFetchJobs} ></SearchInputs>
          {
            selectedUser.id > -1 
            && jobs
            && <div className={styles.ctas}>
              <h2>{selectedUser.name}'s Job Listings</h2>
              {
                jobs?.map((listing: IJobListing) => {
                  return <Card key={listing.id} title={listing.title} link={listing.link}></Card>;
                })
              }
            </div>
          } {
            selectedUser.id > -1  && !jobs && <p>No jobs to list here.</p>
          } {
            selectedUser.id === -1 && <p>Please select a user.</p>
          }
      </main>
    </div>
  );
}
