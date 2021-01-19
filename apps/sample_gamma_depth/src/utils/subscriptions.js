export const getGammaSubscription = (assetId, companyId) => {
  return {
    provider: 'big-data-energy',
    collection: 'actual-gamma-depth',
    assetId,
    params: {},
  };
};
