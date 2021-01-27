import { TextField, FormControl, InputLabel, makeStyles, InputAdornment } from '@material-ui/core';
import { getUnitDisplay } from '@corva/ui/utils/convert';

const useStyles = makeStyles({
  formControl: {
    display: 'flex',
    flexDirection: 'row',
  },
  textFields: {
    marginRight: '18px',
  },
});

const GammaRaySettings = ({ gammaSettings, onSettingsChange }) => {
  const { formControl, textFields } = useStyles();
  return (
    <div>
      <FormControl className={formControl}>
        <TextField
          fullWidth
          type="number"
          className={textFields}
          placeholder="Auto if not set"
          name="gammaRayMin"
          label="Gamma Ray Min"
          value={gammaSettings.gammaRayMin}
          shrink
          InputProps={{
            endAdornment: <InputAdornment position="end">api</InputAdornment>,
          }}
          onChange={onSettingsChange}
        />
        <TextField
          fullWidth
          type="number"
          className={textFields}
          placeholder="Auto if not set"
          name="gammaRayMax"
          label="Gamma Ray Max"
          value={gammaSettings.gammaRayMax}
          shrink
          InputProps={{
            endAdornment: <InputAdornment position="end">api</InputAdornment>,
          }}
          onChange={onSettingsChange}
        />
      </FormControl>
    </div>
  );
};

export default GammaRaySettings;
