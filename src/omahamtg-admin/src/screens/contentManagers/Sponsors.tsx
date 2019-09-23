import React from 'react';

import styles from './ContentManager.module.scss';
import { useSponsors } from './useSponsors';

const Sponsors = () => {
  const { sponsors } = useSponsors();

  return (
    <>
      <div className={styles.listContainer}>
        <ul>
          {sponsors.map(s => (
            <li key={s.name}> {s.name}</li>
          ))}
        </ul>
      </div>
      <div className={styles.formContainer}>form</div>
    </>
  );
};

export default Sponsors;
