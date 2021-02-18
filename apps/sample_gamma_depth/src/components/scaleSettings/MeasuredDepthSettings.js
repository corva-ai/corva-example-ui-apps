import { TextField, FormControl, InputLabel, makeStyles, InputAdornment } from '@material-ui/core';
import { getUnitDisplay } from '@corva/ui/utils/convert';

const useStyles = makeStyles({
  formControl: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: '24px',
  },
  textFields: {
    marginRight: '18px',
  },
});

const MeasuredDepthSettings = ({ depthSettings, onSettingsChange }) => {
  const { formControl, textFields } = useStyles();
  return (
    <FormControl className={formControl}>
      <TextField
        fullWidth
        type="number"
        className={textFields}
        placeholder="Auto if not set"
        name="measuredDepthMin"
        label="Measured Depth Min"
        value={depthSettings.depthMin}
        shrink="true"
        InputProps={{
          endAdornment: <InputAdornment position="end">{getUnitDisplay('length')}</InputAdornment>,
        }}
        onChange={onSettingsChange}
      />
      <TextField
        fullWidth
        type="number"
        className={textFields}
        placeholder="Auto if not set"
        name="measuredDepthMax"
        label="Measured Depth Max"
        value={depthSettings.depthMax}
        shrink="true"
        InputProps={{
          endAdornment: <InputAdornment position="end">{getUnitDisplay('length')}</InputAdornment>,
        }}
        onChange={onSettingsChange}
      />
    </FormControl>
  );
};

export default MeasuredDepthSettings;
