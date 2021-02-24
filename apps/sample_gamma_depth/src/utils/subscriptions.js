export const getGammaSubscription = (assetId, provider) => {
  return {
    provider,
    assetId,
    behavior: 'accumulate',
    collection: 'actual-gamma-depth',
    params: { limit: 10000 },
  };
};
