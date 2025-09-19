import Link from 'next/link';
import styles from './card.module.css';

export default function Card(props: { link: string; title: string; }) {
  return (
    // This is the Card component
    <div className={styles.card}>
      <Link target="_blank" href={props.link}>
        <h4>{props.title}</h4>
      </Link>
      <button>Remove</button>
    </div>
  );
}
