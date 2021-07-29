import { corvaDataAPI } from '@corva/ui/clients';

function App(props) {
  // NOTE: Read asset_id from well. Most datasets are indexed by asset_id.
  const { well: { asset_id } } = props;

  async function deleteDocumentsFromDataset() {
    try {
      const datasetProvider = 'type dataset provider here';
      const datasetName = 'type dataset name here';

      // NOTE: You can delete a specific document by providing document id in the URI
      // NOTE: Or define a query which will match all the documents you want to delete

      // NOTE: Query with matching criteria example.
      // See: https://docs.mongodb.com/manual/tutorial/query-documents/ for more info.
      const query = JSON.stringify({ asset_id, 'data.fieldA': { $gte: 12 } });

      await corvaDataAPI.del(`/api/v1/data/${datasetProvider}/${datasetName}/`,
        { query },
      );

    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <button onClick={deleteDocumentsFromDataset}>
        Delete documents that match criteria
      </button>
    </div>
  );
}

export default App;
