import React from 'react';
import TextField from '@mui/material/TextField';

export default function ExchangeInput({ inputType, value, onChange }) {
  return (
    <TextField
      id="outlined-helperText"
      label="Amount"
      defaultValue={value}
      onChange={e => onChange(inputType, e.target.value)}
    />
  );
}
