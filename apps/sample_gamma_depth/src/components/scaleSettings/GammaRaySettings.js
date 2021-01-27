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

const GammaRaySettings = () => {
  const { formControl, textFields } = useStyles();
  return (
    <div>
      <FormControl className={formControl}>
        <TextField
          fullWidth
          className={textFields}
          placeholder="Auto if not set"
          name="gammaRayMin"
          label="Gamma Ray Min"
          shrink
          InputProps={{
            endAdornment: <InputAdornment position="end">api</InputAdornment>,
          }}
        />
        <TextField
          fullWidth
          className={textFields}
          placeholder="Auto if not set"
          name="gammaRayMax"
          label="Gamma Ray Max"
          shrink
          InputProps={{
            endAdornment: <InputAdornment position="end">api</InputAdornment>,
          }}
        />
      </FormControl>
    </div>
  );
};

export default GammaRaySettings;
