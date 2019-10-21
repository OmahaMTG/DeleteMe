import React from 'react';
import styles from './App.module.scss';
import Sponsors from './screens/contentManagers/Sponsors';
import { Route, HashRouter as Router, Link } from 'react-router-dom';
import Hosts from './screens/contentManagers/Hosts';
import Presenters from './screens/contentManagers/Presenter';
import Templates from './screens/contentManagers/Templates';
import GroupMeeting from './screens/contentManagers/GroupMeeting';
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
                <Link to="/Admin/">Home</Link>
              </li>{' '}
              <li>
                <Link to="/Admin/Event/">Events</Link>
              </li>
              <li>
                <Link to="/Admin/Sponsor/">Sponsors</Link>
              </li>
              <li>
                <Link to="/Admin/Host/">Hosts</Link>
              </li>
              <li>
                <Link to="/Admin/Presenter/">Presenters</Link>
              </li>
              <li>
                <Link to="/Admin/Message/">Contact</Link>
              </li>
              <li>
                <Link to="/Admin/Template/">Templates</Link>
              </li>
              {/* <li>
                <Link to="/Posts/">Posts</Link>
              </li> */}
            </ul>
          </div>
          <div className={styles.content}>
            <Route path="/Admin/Sponsor/:id?" component={Sponsors} />
            <Route path="/Admin/Host/:id?" component={Hosts} />
            <Route path="/Admin/Event/:id?" component={GroupMeeting} />
            <Route path="/Admin/Presenter/:id?" component={Presenters} />

            <Route path="/Admin/Template/:id?" component={Templates} />
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
