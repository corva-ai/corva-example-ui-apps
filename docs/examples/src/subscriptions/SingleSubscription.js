/*
   This example shows the very basic live data subscription usage.
   App subscribes to wits stream and displays records as time - hole depth items
*/
import { useState, useEffect } from 'react';
import { socketClient } from '@corva/ui/clients';

function App(props) {
  // NOTE: Read asset_id from well. Most datasets are indexed by asset_id.
  const { well: { asset_id: assetId } } = props;
  // NOTE: Define state to store subscription data
  const [witsData, setWITSData] = useState([]);

  useEffect(() => {
    setWITSData([]); // NOTE: Clean old state. Needed when assetId changed

    const subscription = { provider: 'corva', dataset: 'wits', assetId }; // Subscription params
    const onDataReceive = event => setWITSData(prevData => prevData.concat(event.data)); // Concatenate new records to state

    const unsubscribe = socketClient.subscribe(subscription, { onDataReceive });

    // NOTE: Unsubscribe to prevent memory leaks in your app
    return () => unsubscribe();
  }, [assetId]);

  return (
    <div>
      <ul>
        {witsData.map(({ timestamp, data: { hole_depth } }) => {
          const date = new Date(timestamp * 1000);
          const formattedDate = date.toTimeString().slice(0, 8);
          return <li key={timestamp}>Time: {formattedDate} - Hole Depth: {hole_depth}</li>;
        })}
      </ul>
    </div>
  );
}

export default App;
