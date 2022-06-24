import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import ExchangeSelect from './ExchangeSelect';
import ExchangeInput from './ExchangeInput';
import Title from '../Title';

export default function ExchangeCalculator({
  currencies,
  currencyExchangeRates,
}) {
  const [firstInputChange, setFirstInputChange] = useState('');
  const [secondInputChange, setSecondInputChange] = useState('');
  const [firstSelectChoice, setFirstSelectChoice] = useState('USD');
  const [secondSelectChoice, setSecondSelectChoice] = useState('EUR');
  const [firstExchangeResult, setFirstExchangeResult] = useState(0);
  const [secondExchangeResult, setSecondExchangeResult] = useState(0);

  const handleCalculateExchange = (type, selectChoice, value) => {
    let result = 0;
    if (selectChoice === 'USD') {
      result = Number(value) * currencyExchangeRates.usd;
    } else if (selectChoice === 'EUR') {
      result = Number(value) * currencyExchangeRates.eur;
    } else if (selectChoice === 'UAH') {
      result = Number(value) * currencyExchangeRates.uah;
    }

    if (result !== 0) {
      if (type === 'first') {
        setFirstExchangeResult(result);
      } else if (type === 'second') {
        setSecondExchangeResult(result);
      }
    }
  };

  const handleInputChange = (inputType, value) => {
    if (inputType === 'first') {
      setFirstInputChange(value);
    } else if (inputType === 'second') {
      setSecondInputChange(value);
    }

    handleCalculateExchange('first', firstSelectChoice, value);
    handleCalculateExchange('second', secondSelectChoice, value);
  };

  const handleSelectChoice = (selectType, value) => {
    if (selectType === 'first') {
      setFirstSelectChoice(value);
    } else if (selectType === 'second') {
      setSecondSelectChoice(value);
    }

    handleCalculateExchange(
      selectType,
      value,
      selectType === 'first'
        ? firstInputChange !== ''
          ? firstInputChange
          : secondInputChange
        : secondInputChange !== ''
        ? secondInputChange
        : firstInputChange,
    );
  };

  return (
    <React.Fragment>
      <Title>Exchange Calculator</Title>
      <ExchangeRowContainer>
        <ExchangeInput
          inputType={'first'}
          value={firstInputChange}
          onChange={handleInputChange}
        />
        <ExchangeSelect
          selectType={'first'}
          currencies={currencies}
          value={firstSelectChoice}
          onChange={handleSelectChoice}
        />
        <span>{firstExchangeResult ? firstExchangeResult : '0'}</span>
      </ExchangeRowContainer>
      <ExchangeRowContainer>
        <ExchangeInput
          inputType={'second'}
          value={secondInputChange}
          onChange={handleInputChange}
        />
        <ExchangeSelect
          selectType={'second'}
          currencies={currencies}
          value={secondSelectChoice}
          onChange={handleSelectChoice}
        />
        <span>{secondExchangeResult ? secondExchangeResult : '0'}</span>
      </ExchangeRowContainer>
    </React.Fragment>
  );
}

const ExchangeRowContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  width: '100%',
  maxWidth: '800px',
  marginRight: 'auto',
  marginLeft: 'auto',
});
