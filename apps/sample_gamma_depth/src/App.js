import { useState, useEffect } from 'react';
import { AppHeader } from '@corva/ui/components';
import { DEFAULT_SETTINGS } from './constants';
import { useSubscriptions } from '@corva/ui/effects';

import { getGammaDepthData } from './utils/apiCalls';

import GammaChart from './components/GammaChart';
import NoGammaData from './components/NoGammaData';

import styles from './App.css';

export function App(props) {
  const {
    isExampleCheckboxChecked,
    app,
    currentUser,
    annotationsProps,
    coordinates,
    rigId,
    scaleSettings,
  } = props;
  const [gammaData, setGammaData] = useState([]);
  // NOTE: This is temporary and will be replaced with a real-time subscription. There are still issues with the asset selector currently cannont select the specific asset with gamma data.
  useEffect(() => {
    const fetchData = async () => {
      const data = await getGammaDepthData(rigId);
      setGammaData(data);
    };
    fetchData();
  }, [rigId]);
  return (
    <div className={styles.container}>
      <AppHeader app={app} currentUser={currentUser} annotationsProps={annotationsProps} />
      <div className={styles.content}>
        {gammaData.length ? (
          <GammaChart coordinates={coordinates} data={gammaData} scaleSettings={scaleSettings} />
        ) : (
          <NoGammaData />
        )}
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
