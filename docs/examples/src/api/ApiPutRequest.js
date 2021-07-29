import moment from 'moment';
import { corvaDataAPI } from '@corva/ui/clients';

function App(props) {
  const { well: { asset_id: assetId }, currentUser: { company_id } } = props;

  async function putRecordToDataset() {
    try {
      const datasetProvider = 'type dataset provider here';
      const datasetName = 'type dataset name here';

      await corvaDataAPI.put(`/api/v1/data/${datasetProvider}/${datasetName}/`,
        {
          // NOTE: company_id, asset_id, version and timestamp are REQUIRED fields in PUT request
          company_id: company_id,
          asset_id: assetId,
          version: 1,
          timestamp: moment().unix(),
          data: {
            fieldA: 1,
            fieldB: 2,
            fieldC: 3,
          },
        });

    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <button onClick={putRecordToDataset}>
        Put record to dataset!
      </button>
    </div>
  );
}

export default App;
