import { useState } from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import { ExpandLess as ExpandLessIcon, ExpandMore as ExpandMoreIcon } from '@material-ui/icons';

const useStyles = makeStyles({
  scaleSettingsContainer: {
    marginTop: '1rem',
    display: 'flex',
    alignItems: 'center',
  },
});

const ScaleSettings = () => {
  const { scaleSettingsContainer } = useStyles();
  const [scalesExpanded, setScalesExpanded] = useState(false);

  const toggleScalesSettings = () => {
    setScalesExpanded(value => !value);
  };
  return (
    <div className={scaleSettingsContainer}>
      <Typography variant="h6">Scale Settings</Typography>
      {scalesExpanded ? (
        <ExpandLessIcon onClick={toggleScalesSettings} />
      ) : (
        <ExpandMoreIcon onClick={toggleScalesSettings} />
      )}
    </div>
  );
};

export default ScaleSettings;
