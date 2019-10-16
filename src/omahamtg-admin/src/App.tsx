import React from 'react';
import styles from './App.module.scss';
import Sponsors from './screens/contentManagers/Sponsors';
import { Route, BrowserRouter as Router, Link } from 'react-router-dom';
import Hosts from './screens/contentManagers/Hosts';
import Presenters from './screens/contentManagers/Presenter';
import Templates from './screens/contentManagers/Templates';
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
                <Link to="/Event/">Events</Link>
              </li>
              <li>
                <Link to="/Sponsor/">Sponsors</Link>
              </li>
              <li>
                <Link to="/Host/">Hosts</Link>
              </li>
              <li>
                <Link to="/Presenter/">Presenters</Link>
              </li>
              <li>
                <Link to="/Message/">Contact</Link>
              </li>
              <li>
                <Link to="/Template/">Templates</Link>
              </li>
              {/* <li>
                <Link to="/Posts/">Posts</Link>
              </li> */}
            </ul>
          </div>
          <div className={styles.content}>
            <Route path="/Sponsor/:id?" component={Sponsors} />
            <Route path="/Host/:id?" component={Hosts} />

            <Route path="/Presenter/:id?" component={Presenters} />

            <Route path="/Template/:id?" component={Templates} />
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
