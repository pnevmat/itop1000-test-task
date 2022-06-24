import React from 'react';
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function ExchangeSelect({
  selectType,
  currencies,
  value,
  onChange,
}) {
  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Currency</InputLabel>
        <StyledSelect
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={value}
          label="Currency"
          onChange={e => onChange(selectType, e.target.value)}
        >
          <MenuItem value={currencies.usd}>{currencies.usd}</MenuItem>
          <MenuItem value={currencies.eur}>{currencies.eur}</MenuItem>
          <MenuItem value={currencies.uah}>{currencies.uah}</MenuItem>
        </StyledSelect>
      </FormControl>
    </>
  );
}

const StyledSelect = styled(Select)({
  width: '100%',
  minWidth: '223px',
  '&.Mui-focused > fieldset > legend': {
    width: '100%',
    maxWidth: '57px',
  },
});
