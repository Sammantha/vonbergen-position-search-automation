import styles from "./page.module.css";
import mockedJobs from "../../positions";
import Card from "./components/card/card";
import React from "react";
import SearchInputs from "./components/searchInputs/seachInputs";
import { IJobListing } from "../../types";

interface IState {
  listings: IJobListing[];
}

export default function Home() {
  const initialJobs:IState = {listings: []}
  const [currentUser, setCurrentUser] = React.useState('');
  const [jobs, setJobs] = React.useState(initialJobs);

  const setUserFetchJobs = (userName: string) => {
    setCurrentUser(userName);
    setJobs({listings: mockedJobs});
  }

  return (
    <div className={styles.page}>
      <header>
        <h2>VonBergen Job Search Automation</h2>
      </header>
      <main className={styles.main}>
        <SearchInputs callback={setUserFetchJobs} ></SearchInputs>
        <div className={styles.ctas}>
          {
            currentUser && jobs?.listings && jobs?.listings?.map((listing: IJobListing) => {
              return <Card key={listing.id} title={listing.title} link={listing.link}></Card>;
            })
          } {
            currentUser && !jobs?.listings && <p>No jobs to list here.</p>
          } {
            !currentUser && <p>Please select a user.</p>
          }
        </div>
      </main>
    </div>
  );
}
