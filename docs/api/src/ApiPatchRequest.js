import { corvaDataAPI } from '@corva/ui/clients';

function App(props) {
  const { currentUser: { company_id } } = props;

  async function patchRecordToDataset() {
    try {
      const datasetProvider = 'type dataset provider here';
      const datasetName = 'type dataset name here';
      const recordId = 'type record id here';

      await corvaDataAPI.patch(`/api/v1/data/${datasetProvider}/${datasetName}/${recordId}/`,
        {
          version: 2, // NOTE: Versions is required for DATA API patch requests
          company_id,
          data: {
            fieldA: 22,
            fieldB: 23,
            fieldC: 24,
          },
        });

    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <button onClick={patchRecordToDataset}>
        Patch existing record from dataset!
      </button>
    </div>
  );
}

export default App;
