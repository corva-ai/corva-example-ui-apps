import { useState, useEffect } from 'react';
import { corvaDataApi } from '@corva/ui/clients';


function useFetchWellSections(assetId) {
  const [wellSections, setWellSections] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchWellSections(assetId) {
    try {
      setLoading(true);

      const response = await corvaDataApi.get(`/api/v1/data/corva/data.well-sections/`, {
        limit: 20, // NOTE: Fetch up to 20 well sections
        skip: 0, // NOTE: Required for pagination
        // NOTE: Make sure the sort field hit database inxexes. Otherwise the request will take too long
        sort: JSON.stringify({ 'data.top_depth': -1 }),
        query: JSON.stringify({ 'asset_id': assetId }),
        // NOTE: To make efficient request - fetch only needed fields
        fields: ['data.name', 'data.diameter', 'data.top_depth'].join(','),
      });

      // NOTE: Set component state
      setWellSections(response);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchWellSections(assetId);
  }, [assetId]); // NOTE: A new request will be sent on every rig or well change in App Settings

  return { loading, wellSections };
}


function App(props) {
  const { well: { asset_id: assetId } } = props;
  const { loading, wellSections } = useFetchWellSections(assetId);

  // NOTE: Data is still fetching
  if (loading) return <div>App is loading hole sections data right now</div>;
  // NOTE: Data is fetched, we can render it
  return (
    <div>
      <ul>
        {wellSections.map(section => (
          <li key={section.data.id}>{section.data.name} - {section.data.diameter} - {section.data.top_depth}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
