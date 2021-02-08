import { useState, useEffect } from 'react';
import { get } from 'lodash';
import { AppHeader, LoadingIndicator } from '@corva/ui/components';
import { useSubscriptions } from '@corva/ui/effects';

import { getGammaDepthData } from './utils/apiCalls';
import { DEFAULT_SETTINGS } from './constants';
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
    scaleSettings,
    well,
  } = props;
  // NOTE: This is the only way to extract assetId from the well prop currently. Simply using well.asset_id causes issues with the incoming props.
  const assetId = Number(get(well, 'asset_id'));
  const provider = currentUser.company.provider;
  const [loading, setLoading] = useState(true);
  const [gammaData, setGammaData] = useState([]);
  // NOTE: This is temporary and will be replaced with a real-time subscription. There are still issues with the asset selector currently cannont select the specific asset with gamma data.
  useEffect(() => {
    console.log(assetId);
    const fetchData = async () => {
      setLoading(true);
      const data = await getGammaDepthData(assetId, provider);
      setGammaData(data);
      setLoading(false);
    };
    fetchData();
  }, [assetId]);
  return (
    <div className={styles.container}>
      <AppHeader app={app} currentUser={currentUser} annotationsProps={annotationsProps} />
      {!loading ? (
        <div className={styles.content}>
          {gammaData.length ? (
            <GammaChart coordinates={coordinates} data={gammaData} scaleSettings={scaleSettings} />
          ) : (
            <NoGammaData />
          )}
        </div>
      ) : (
        <LoadingIndicator />
      )}
    </div>
  );
}

App.defaultProps = {
  ...DEFAULT_SETTINGS,
};

// Important: Do not change root component default export (App.js). Use it as container
//  for your App. It's required to make build and zip scripts work as expected;
export default App;
