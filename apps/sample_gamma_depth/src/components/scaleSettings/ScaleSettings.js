import { useState, Fragment } from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import { ExpandLess as ExpandLessIcon, ExpandMore as ExpandMoreIcon } from '@material-ui/icons';

import MeasuredDepthSettings from './MeasuredDepthSettings';
import GammaRaySettings from './GammaRaySettings';

const useStyles = makeStyles({
  scaleSettingsContainer: {
    marginTop: '1rem',
    display: 'flex',
    alignItems: 'center',
  },
});

const ScaleSettings = ({ scaleSettings, handleScaleSettingsChange }) => {
  const { measuredDepthMax, measuredDepthMin, gammaRayMax, gammaRayMin } = scaleSettings;
  const { scaleSettingsContainer } = useStyles();
  const [scalesExpanded, setScalesExpanded] = useState(false);

  const toggleScalesSettings = () => {
    setScalesExpanded(value => !value);
  };
  return (
    <div>
      <div className={scaleSettingsContainer}>
        <Typography variant="h6">Scale Settings</Typography>
        {scalesExpanded ? (
          <ExpandLessIcon onClick={toggleScalesSettings} />
        ) : (
          <ExpandMoreIcon onClick={toggleScalesSettings} />
        )}
      </div>
      <div>
        {scalesExpanded && (
          <Fragment>
            <MeasuredDepthSettings
              depthSettings={{ measuredDepthMax, measuredDepthMin }}
              onSettingsChange={handleScaleSettingsChange}
            />
            <GammaRaySettings
              gammaSettings={{ gammaRayMax, gammaRayMin }}
              onSettingsChange={handleScaleSettingsChange}
            />
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default ScaleSettings;
