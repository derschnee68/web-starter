import type { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';
import MuiTextField from '@mui/material/TextField';
import type { FC } from 'react';
import { useController } from 'react-hook-form';
import type { ControlAny } from '../../types/react-hook-form';

type TextFieldProps = MuiTextFieldProps & {
  name: string;
  control: ControlAny;
};

const TextField: FC<TextFieldProps> = ({ control, ...props }) => {
  const {
    field: { ref, ...rhfProps },
    fieldState,
  } = useController({
    control,
    name: props.name,
    defaultValue: '',
  });

  return (
    <MuiTextField
      {...props}
      {...rhfProps}
      margin={props.margin ?? 'normal'}
      fullWidth={props.fullWidth ?? true}
      onChange={(event) => {
        rhfProps.onChange(event);
        props?.onChange?.(event);
      }}
      inputRef={ref}
      error={Boolean(fieldState.error)}
      helperText={fieldState.error?.message ?? props.helperText}
    />
  );
};

export default TextField;
