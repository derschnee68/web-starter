import type { FC } from 'react';
import React, { useState } from 'react';
import { IconButton, InputAdornment, Tooltip } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import TextField from './TextField';
import type { ControlAny } from '../../types/react-hook-form';

interface PasswordTextFieldProps {
  control: ControlAny;
}

const PasswordTextField: FC<PasswordTextFieldProps> = ({ control }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      control={control}
      name="password"
      type={showPassword ? 'text' : 'password'}
      label="Password"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Tooltip title={showPassword ? 'Hide password' : 'Show password'}>
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword((show) => !show)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </Tooltip>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordTextField;
