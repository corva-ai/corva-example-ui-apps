/*
    This example shows how to fetch initial data through HTTP
    and then append new records to that data through socket subscription
*/
import { useState, useEffect } from 'react';
import { reverse } from 'lodash';
import { socketClient, corvaDataAPI } from '@corva/ui/clients';

async function fetchWITSSummaryData(assetId) {
  try {
    return await corvaDataAPI.get(`/api/v1/data/corva/wits.summary-1m/`, {
      limit: 120, // NOTE: Fetch last 2 hours
      skip: 0, // NOTE: Required for pagination
      // NOTE: Make sure the sort field hit database indexes. Otherwise the request will take too long
      sort: JSON.stringify({ 'timestamp': -1 }),
      query: JSON.stringify({ 'asset_id': assetId }),
      // NOTE: To make efficient request - fetch only fields used by the app
      fields: ['timestamp', 'data.hole_depth'].join(','),
    });
  } catch (e) {
    console.log(e);
  }
}

function App(props) {
  // NOTE: Read asset_id from well. Most datasets are indexed by asset_id.
  const { well: { asset_id: assetId } } = props;
  // NOTE: Define state to store subscription data
  const [witsSummaryData, setWITSSummaryData] = useState([]);

  useEffect(() => {
    let unsubscribe;

    // Make initial request first
    fetchWITSSummaryData(assetId).then(response => {
      setWITSSummaryData(reverse(response));
      const subscription = { provider: 'corva', dataset: 'wits.summary-1m', assetId }; // Subscription params
      // Concatenate new records to state
      const onDataReceive = event => setWITSSummaryData(prevData => prevData.concat(event.data));

      // NOTE: Subscribe to updates after initial data request
      unsubscribe = socketClient.subscribe(subscription, { onDataReceive });
    });


    // NOTE: Unsubscribe to prevent memory leaks in your app.
    return () => unsubscribe?.();
  }, [assetId]);

  return (
    <div>
      {witsSummaryData.length} records
    </div>
  );
}

export default App;
