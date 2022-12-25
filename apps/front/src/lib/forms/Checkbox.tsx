import { FormControl, FormHelperText } from '@mui/material';
import type { CheckboxProps as MuiCheckboxProps } from '@mui/material/Checkbox';
import MuiCheckbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import type { FC, ReactNode } from 'react';
import { useController } from 'react-hook-form';
import type { ControlAny } from '../../types/react-hook-form';

interface CheckboxProps extends MuiCheckboxProps {
  name: string;
  control: ControlAny;
  label?: ReactNode;
  helperText?: ReactNode;
}

const Checkbox: FC<CheckboxProps> = ({ control, helperText: _helperText, ...props }) => {
  const {
    field: { ref, ...fieldProps },
    fieldState,
  } = useController({ control, name: props.name });

  const error = Boolean(fieldState.error);
  const helperText = fieldState.error?.message ?? _helperText;

  const checkbox = <MuiCheckbox defaultChecked {...fieldProps} />;

  return (
    <FormControl>
      <FormControlLabel disabled={props.disabled} inputRef={ref} label={props.label} control={checkbox} />

      {helperText && <FormHelperText error={error}>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default Checkbox;
