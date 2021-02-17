import { useState, Fragment } from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import { ExpandLess as ExpandLessIcon, ExpandMore as ExpandMoreIcon } from '@material-ui/icons';

import MeasuredDepthSettings from './MeasuredDepthSettings';
import GammaRaySettings from './GammaRaySettings';
import { getConvertedValue } from '../../utils/dataProcessing';

const useStyles = makeStyles({
  scaleSettingsContainer: {
    marginTop: '1rem',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
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
      <span className={scaleSettingsContainer} onClick={toggleScalesSettings}>
        <Typography variant="h6">Scale Settings</Typography>
        {scalesExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </span>
      <div>
        {scalesExpanded && (
          <Fragment>
            <MeasuredDepthSettings
              depthSettings={{
                depthMax: getConvertedValue(measuredDepthMax),
                depthMin: getConvertedValue(measuredDepthMin),
              }}
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
