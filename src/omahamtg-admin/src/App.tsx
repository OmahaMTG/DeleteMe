import React from 'react';
import styles from './App.module.scss';
import { Route, HashRouter as Router, Link } from 'react-router-dom';
import { Sponsors } from './2_Screens/ResourceManagers/Sponsor';
import { Hosts } from './2_Screens/ResourceManagers/Host';
import { Meetings } from './2_Screens/ResourceManagers/Meeting';
import { Presenters } from './2_Screens/ResourceManagers/Presenter';
import { Templates } from './2_Screens/ResourceManagers/Template';
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
                <Link to="/Admin/" style={{ color: 'red' }}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/Admin/Meetings/">Meetings</Link>
              </li>
              <li>
                <Link to="/Admin/Sponsor/">Sponsors</Link>
              </li>
              <li>
                <Link to="/Admin/Hosts/">Hosts</Link>
              </li>
              <li>
                <Link to="/Admin/Presenters/">Presenters</Link>
              </li>
              <li>
                <Link to="/Admin/Templates/">Templates</Link>
              </li>
              <li>
                <Link to="/Admin/Contact/" style={{ color: 'red' }}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.content}>
            <Route path="/Admin/Meetings/:id?" component={Meetings} />
            <Route path="/Admin/Hosts/:id?" component={Hosts} />
            <Route path="/Admin/Sponsor/:id?" component={Sponsors} />
            <Route path="/Admin/Presenters/:id?" component={Presenters} />
            <Route path="/Admin/Templates/:id?" component={Templates} />
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
