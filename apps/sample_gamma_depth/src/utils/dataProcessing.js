import { getUnitPreference, convertValue } from '@corva/ui/utils/convert';

export const getConvertedSaveValue = value => {
  return convertValue(value, 'length', getUnitPreference('length'), 'ft');
};

export const getConvertedValue = value => {
  return convertValue(value, 'length', 'ft', getUnitPreference('length'));
};
