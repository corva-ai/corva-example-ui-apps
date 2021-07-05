import { useState, useEffect } from 'react';
import Jsona from 'jsona';

import { corvaAPI } from '@corva/ui/clients';

// NOTE: data formatter is required for data deserialization
const dataFormatter = new Jsona();

// NOTE: Define custom react hook to fetch wells and store them in component state
function useFetchRigWells(rigId) {
  // NOTE: Declare component state
  const [wells, setWells] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchRigWells(rigId) {
    try {
      setLoading(true);

      // NOTE: Only fields provided in "fields" key will be returned. Use it
      const response = await corvaAPI.get(`/v2/wells`, {
        limit: 100, // NOTE: Fetch up to 100 wells
        sort: 'name', // NOTE: Sort wells by name
        rig: rigId,
        // NOTE: Include only these fields in response.
        // If "fields: all" is applied then all fields will be returned
        fields: ['well.name', 'well.id'],
      });

      // NOTE: Deserialize api response
      const deserializedResponse = dataFormatter.deserialize(response);

      // NOTE: Set component state
      setWells(deserializedResponse);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRigWells(rigId);
  }, [rigId]); // NOTE: A new request will be done on every rig change in App Settings

  return { loading, wells };
}


function App(props) {
  const { rigId } = props;
  const { loading, wells } = useFetchRigWells(rigId);

  // NOTE: Data is still fetching
  if (loading) return <div>App is loading hole sections data right now</div>;
  // NOTE: Data is fetched, we can render it
  return (
    <div>
      <ul>
        {wells.map(well => (
          <li key={well.id}>{well.name}</li>
        ))}
      </ul>
    </div>
  );
}


export default App;
