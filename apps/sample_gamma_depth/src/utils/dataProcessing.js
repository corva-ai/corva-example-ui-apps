import { getUnitPreference, convertValue } from '@corva/ui/utils/convert';

export const getConvertedSaveValue = value => {
  return convertValue(value, 'length', getUnitPreference('length'), 'ft');
};

export const getConvertedValue = value => {
  return convertValue(value, 'length', 'ft', getUnitPreference('length'));
};

export const getGammaChartArray = value => {
  const gammaData = value.map(({ data }) => [getConvertedValue(data.gamma_depth), data.gamma_ray]);

  return gammaData || [];
};
