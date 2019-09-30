import React from 'react';
import styles from './App.module.scss';
import Sponsors from './screens/contentManagers/Sponsors';
import { Route, BrowserRouter as Router, Link } from 'react-router-dom';
// import { CounterButton } from './components/CounterButton';

const App = () => {
  return (
    <Router>
      <div className={styles.app}>
        <div className={styles.head}>Admin</div>
        <div className={styles.body}>
          <div className={styles.sidebar}>
            <ul className={styles.siteNav}>
              <li>
                <Link to="/">Home</Link>
              </li>{' '}
              <li>
                <Link to="/Events/">Events</Link>
              </li>
              <li>
                <Link to="/Sponsor/">Sponsors</Link>
              </li>
              <li>
                <Link to="/Hosts/">Hosts</Link>
              </li>
              <li>
                <Link to="/Presenters/">Presenters</Link>
              </li>
              <li>
                <Link to="/Message/">Contact</Link>
              </li>
              <li>
                <Link to="/Templates/">Templates</Link>
              </li>
              {/* <li>
                <Link to="/Posts/">Posts</Link>
              </li> */}
            </ul>
          </div>
          <div className={styles.content}>
            <Route path="/Sponsor/:id?" component={Sponsors} />
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
