import { AppSettingsAssetEditor } from '@corva/ui/components';
import { ASSET_TYPES } from '@corva/ui/constants';

import { makeStyles, Divider } from '@material-ui/core';

import { DEFAULT_SETTINGS } from './constants';
import ScaleSettings from './components/scaleSettings';
import { getConvertedSaveValue } from './utils/dataProcessing';

const useStyles = makeStyles({
  settingsWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
});

function AppSettings({
  settings: apiSettings,
  onSettingChange,
  onSettingsChange,
  appData,
  app,
  user,
  company,
  layoutEnvironment,
}) {
  const settings = { ...DEFAULT_SETTINGS, ...apiSettings };
  const { settingsWrapper } = useStyles();

  const handleScaleSettingChange = e => {
    const { name, value } = e.target;
    // NOTE: we want to allow this value to be null or numeric
    const updatedValue = value === '' ? null : Number(value);
    onSettingsChange({
      scaleSettings: { ...settings.scaleSettings, [name]: getConvertedSaveValue(updatedValue) },
    });
  };
  return (
    <div className={settingsWrapper}>
      {(!layoutEnvironment || layoutEnvironment.type === 'general') && (
        <AppSettingsAssetEditor
          settings={settings}
          onAssetChange={onSettingChange}
          onAssetsChange={onSettingsChange}
          appType={{
            primaryAsset: {
              assetType: ASSET_TYPES.rig,
              autocompleteSelect: true,
            },
            secondaryAsset: {
              assetType: ASSET_TYPES.well,
              autocompleteSelect: false,
            },
          }}
          isNullable={false}
          label="Active Asset"
        />
      )}
      <ScaleSettings
        scaleSettings={settings.scaleSettings}
        handleScaleSettingsChange={handleScaleSettingChange}
      />
    </div>
  );
}

// Important: Do not change root component default export (AppSettings.js). Use it as container
//  for your App Settings. It's required to make build and zip scripts work as expected;
export default AppSettings;
