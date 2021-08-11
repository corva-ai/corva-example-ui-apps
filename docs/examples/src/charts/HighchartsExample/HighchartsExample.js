/*
    This example is a simple app which consists of: AppHeader, Select and Highcharts Chart
*/
import { useState } from 'react';
import { LoadingIndicator, AppHeader, Select } from '@corva/ui/components';
import { MenuItem } from '@material-ui/core';

import { useWITSSummaryData } from './effects';
import { WITSSummaryChart } from './components';
import { DATASETS } from './constants';

import styles from './styles.css';

function App(props) {
  // NOTE: Read asset_id from well. Most datasets are indexed by asset_id.
  const {
    well: { asset_id: assetId },
    coordinates,
    appHeaderProps,
  } = props;

  const [dataset, setDataset] = useState(DATASETS[0]);
  // NOTE: Use custom react hook to encapsulate data fetching/subscriptions logic
  const { witsSummaryData, loading } = useWITSSummaryData({ assetId, dataset });

  return (
    <div className={styles.container}>
      <AppHeader {...appHeaderProps} />

      <div className={styles.content}>
        <Select
          value={dataset}
          onChange={e => setDataset(e.target.value)}
          FormControlProps={{ className: styles.select }}
        >
          {DATASETS.map(dataset => (
            <MenuItem key={dataset} value={dataset}>
              {dataset}
            </MenuItem>
          ))}
        </Select>

        {/*Show loading indicator while data is loading*/}
        {loading && <LoadingIndicator />}
        {!loading && (
          <WITSSummaryChart data={witsSummaryData} coordinates={coordinates} dataset={dataset} />
        )}
      </div>
    </div>
  );
}

export default App;
