'use client';
import styles from "./page.module.css";
import Card from "./components/card/card";
import React from "react";
import SearchInputs from "./components/searchInputs/seachInputs";
import { IJobListing, IUser } from "../../types";
import mockedJobs from '../../positions';
import Link from "next/link";
import Image from "next/image";

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

  const setUserFetchJobs = async (user: IUser) => {
    setSelectedUser(user);
    setJobs(await fetchJobs(user.id));
  };

  const fetchJobs = async (id: number): Promise<IJobListing[]> => {
    // `/api/` is prepended because that's a //file// Route that NextJS has permission to route to
    // `/get-jobs` is used to route the request furhter, within the code
    // return GET(new Request(`/api/get-jobs/${id}`)).then((response) => {
    //   return JSON.parse(response.body!.toString()) ?? [];
    // });
    return mockedJobs;
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
              <h2>{selectedUser.name}&apos;s Job Listings</h2>
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
      <footer>
          <Link target='_blank' href='https://notbyai.fyi'>
            <Image alt='Made by Humans, not by AI' src='Developed-By-Humans-Not-By-AI-Badge-white.svg' width='130' height='41'/>
          </Link>
      </footer>
    </div>
  );
}
