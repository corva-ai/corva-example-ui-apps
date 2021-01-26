import { getDataAppStorage } from '@corva/ui/clients/jsonApi';

const provider = 'big-data-energy';
const collectionName = 'actual-gamma-depth';

export async function getGammaDepthData(assetId) {
  let response = [];

  try {
    const queryWithAsset = JSON.stringify({ asset_id: +assetId });
    response = await getDataAppStorage(provider, `${collectionName}/`, {
      limit: 10000,
      query: queryWithAsset,
      sort: '{"timestamp": 1}',
    });
  } catch (e) {
    console.log(e);
    return [];
  }
  // NOTE: here we are simply processing the data returned from the api so the chart can read each point as [x,y] coordinates. There are many different ways to do this and highcharts accepts multiple data formats
  const gammaData = response.map(({ data }) => [data.gamma_ray, data.gamma_depth]);

  return gammaData || [];
}
