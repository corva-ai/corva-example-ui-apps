/*
    This example shows how update event can be used in subscriptions.
    It fetches well sections list initially. Then subscribes to well sections updates and reflects changes on ui
 */
import { useState, useEffect } from 'react';
import { keyBy } from 'lodash';
import { socketClient, corvaDataAPI } from '@corva/ui/clients';


async function fetchWellSections(assetId) {
  try {
    return await corvaDataAPI.get(`/api/v1/data/corva/data.well-sections/`, {
      limit: 20, // NOTE: Fetch up to 20 well sections
      skip: 0, // NOTE: Required for pagination
      // NOTE: Make sure the sort field hit database indexes. Otherwise the request will take too long
      sort: JSON.stringify({ 'data.top_depth': -1 }),
      query: JSON.stringify({ 'asset_id': assetId }),
      // NOTE: To make efficient request - fetch only needed fields
      fields: ['data.name', 'data.diameter', 'data.top_depth'].join(','),
    });

  } catch (e) {
    console.log(e);
  }
}

function App(props) {
  // NOTE: Read asset_id from well. Most datasets are indexed by asset_id.
  const { well: { asset_id: assetId } } = props;

  // NOTE: Define state to store subscription data
  const [wellSections, setWellSections] = useState([]);

  useEffect(() => {
    let unsubscribe;
    fetchWellSections(assetId).then(response => {
      setWellSections(response);

      // Subscription params
      const subscription = { provider: 'corva', dataset: 'data.well-sections', assetId, event: 'update' };
      const onDataReceive = event => {
        const updatedSectionById = keyBy(event.data, '_id');
        // NOTE: Replace only updated well sections.
        // If well section is not in updatedSectionById map, then it's no changes
        setWellSections(prevWellSections => prevWellSections.map(section => updatedSectionById[section._id] || section));
      };

      unsubscribe = socketClient.subscribe(subscription, { onDataReceive });

    });

    // NOTE: Unsubscribe to prevent memory leaks in your app
    return () => unsubscribe?.();
  }, [assetId]);

  return (
    <div>
      <ul>
        {wellSections.map(section => (
          <li key={section._id}>{section.data.name} - {section.data.diameter} - {section.data.top_depth}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
