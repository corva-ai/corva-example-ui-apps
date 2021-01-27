import { AppSettingsAssetEditor } from '@corva/ui/components';
import { ASSET_TYPES } from '@corva/ui/constants';

import { makeStyles, Divider } from '@material-ui/core';

import { DEFAULT_SETTINGS } from './constants';
import ScaleSettings from './components/scaleSettings';

const useStyles = makeStyles({
  settingsWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  dividerStyles: {
    marginBottom: '10px',
    borderBottom: '1px solid #888',
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
}) {
  const settings = { ...DEFAULT_SETTINGS, ...apiSettings };
  const { settingsWrapper, dividerStyles } = useStyles();
  return (
    <div className={settingsWrapper}>
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
      <ScaleSettings />
    </div>
  );
}

// Important: Do not change root component default export (AppSettings.js). Use it as container
//  for your App Settings. It's required to make build and zip scripts work as expected;
export default AppSettings;
