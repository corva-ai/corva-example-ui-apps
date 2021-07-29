import moment from 'moment';
import { corvaDataAPI } from '@corva/ui/clients';

function App(props) {
  const { well: { asset_id: assetId } } = props;

  async function postRecordsToDataset() {
    try {
      const datasetProvider = 'type dataset provider here';
      const datasetName = 'type dataset name here';

      await corvaDataAPI.post(`/api/v1/data/${datasetProvider}/${datasetName}/`, [
        {
          // NOTE: asset_id, version and timestamp are required fields.
          asset_id: assetId,
          version: 1,
          timestamp: moment().unix() - 1,
          data: {
            fieldA: 1,
            fieldB: 2,
            fieldC: 3,
          },
        },
        {
          asset_id: assetId,
          version: 1,
          timestamp: moment().unix(),
          data: {
            fieldA: 11,
            fieldB: 12,
            fieldC: 13,
          },
        }]);

    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <button onClick={postRecordsToDataset}>
        Post records to dataset!
      </button>
    </div>
  );
}

export default App;
