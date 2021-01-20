import { Checkbox, FormControlLabel } from '@material-ui/core';

import { AppSettingsAssetEditor } from '@corva/ui/components';
import { ASSET_TYPES } from '@corva/ui/constants';

import { DEFAULT_SETTINGS } from './constants';

function AppSettings({
  settings: apiSettings,
  onSettingChange,
  onSettingsChange,
  appData,
  app,
  user,
  company,
}) {
  console.log({ appData, app, user, company });
  const settings = { ...DEFAULT_SETTINGS, ...apiSettings };
  return (
    <div>
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
      `
    </div>
  );
}

// Important: Do not change root component default export (AppSettings.js). Use it as container
//  for your App Settings. It's required to make build and zip scripts work as expected;
export default AppSettings;
