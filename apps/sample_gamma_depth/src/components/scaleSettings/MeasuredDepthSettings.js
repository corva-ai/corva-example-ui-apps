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

const MeasuredDepthSettings = () => {
  const { formControl, textFields } = useStyles();
  return (
    <FormControl className={formControl}>
      <TextField
        fullWidth
        className={textFields}
        placeholder="Auto if not set"
        name="measuredDepthMin"
        label="Measured Depth Min"
        shrink
        InputProps={{
          endAdornment: <InputAdornment position="end">{getUnitDisplay('length')}</InputAdornment>,
        }}
      />
      <TextField
        fullWidth
        className={textFields}
        placeholder="Auto if not set"
        name="measuredDepthMax"
        label="Measured Depth Max"
        shrink
        InputProps={{
          endAdornment: <InputAdornment position="end">{getUnitDisplay('length')}</InputAdornment>,
        }}
      />
    </FormControl>
  );
};

export default MeasuredDepthSettings;
