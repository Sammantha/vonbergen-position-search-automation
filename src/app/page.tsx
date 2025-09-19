import styles from "./page.module.css";
import jobs from "../../positions";
import Card from "./components/card/card";

export default function Home() {
  return (
    <div className={styles.page}>
      <header>
        <h2>VonBergen Job Search Automation</h2>
      </header>
      <main className={styles.main}>
        <div className={styles.ctas}>
          {
            jobs.length && jobs.map((listing) => {
              return <Card key={listing.id} title={listing.title} link={listing.link}></Card>;
            })
          } {
            !jobs && <p>No jobs to list here.</p>
          }
        </div>
      </main>
    </div>
  );
}
