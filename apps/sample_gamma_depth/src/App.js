import { useState, useEffect } from 'react';
import { AppHeader } from '@corva/ui/components';
import { DEFAULT_SETTINGS } from './constants';
import { useSubscriptions } from '@corva/ui/effects';

import { getGammaSubscription } from './utils/subscriptions';

import GammaChart from './components/GammaChart';

import styles from './App.css';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function App(props) {
  const { isExampleCheckboxChecked, app, currentUser, annotationsProps, coordinates, well } = props;
  const [gammaData, setGammaData] = useState([[0, 0]]);
  // NOTE: This is temporary and will be replaced with a real-time subscription. This is only here for mocking purposes.
  useEffect(() => {
    setInterval(() => {
      setGammaData(prev => [
        ...prev,
        [getRandomInt(prev.slice(-1)[0][0], prev.slice(-1)[0][0] + 20), getRandomInt(20, 100)],
      ]);
    }, 5000);
    return clearInterval();
  }, []);
  return (
    <div className={styles.container}>
      <AppHeader app={app} currentUser={currentUser} annotationsProps={annotationsProps} />
      <div className={styles.content}>
        <GammaChart coordinates={coordinates} data={gammaData} />
      </div>
    </div>
  );
}

App.defaultProps = {
  ...DEFAULT_SETTINGS,
};

// Important: Do not change root component default export (App.js). Use it as container
//  for your App. It's required to make build and zip scripts work as expected;
export default App;
