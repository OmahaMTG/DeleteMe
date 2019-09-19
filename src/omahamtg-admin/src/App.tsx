import React from 'react';
import styles from './App.module.scss';
import Sponsors from './screens/Sponsors';
// import { Route, BrowserRouter as Router, Link } from 'react-router-dom';
// import { CounterButton } from './components/CounterButton';

const App = () => {
  return (
    <div className={styles.app}>
      <div className={styles.head}>OmahaMTG Admin</div>
      <div className={styles.body}>
        <div className={styles.sidebar}>
          <ul>
            <li>Sponsors</li>
            <li>Hosts</li>
            <li>Posts</li>
            <li>Events</li>
            <li>Presenters</li>
          </ul>
        </div>
        <div className={styles.content}>
          <Sponsors />
        </div>
      </div>
    </div>
  );
};

export default App;
