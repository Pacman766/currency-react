import React, { useEffect, useState } from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow';

const BASE_URL =
  'http://api.exchangeratesapi.io/v1/latest?access_key=fc19f25be9a53c653b0e271b9b9026ff';

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]); // getting currency data
  const [fromCurrency, setFromCurrency] = useState(); // from default currency
  const [toCurrency, setToCurrency] = useState(); // to default currency
  const [exchangeRate, setExchangeRate] = useState(); //
  const [amount, setAmount] = useState(1); // default amount of curr
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true); // setting currenct amount of another input

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  // 1) get url api
  // 2) convert to json
  // 3) get base currency and arr with data of all other curr
  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        const firstCurrency = Object.keys(data.rates)[0];
        setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
        setFromCurrency(data.base);
        setToCurrency(firstCurrency);
        setExchangeRate(data.rates[firstCurrency]); // setting exchange rate of default currency
      });
  }, []);

  // aloud to update currency when value  and curr already exist
  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${BASE_URL}&from=${fromCurrency}&to=${toCurrency}`)
        .then((res) => res.json())
        .then((data) => setExchangeRate(data.rates[toCurrency]));
    }
  }, [fromCurrency, toCurrency]);

  // aloud to value of curr, while value already exists
  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }
  // aloud to value of curr, while value already exists
  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  return (
    <>
      <h1>Currency Converter</h1>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={(e) => setFromCurrency(e.target.value)}
        onChangeAmount={handleFromAmountChange}
        amount={fromAmount}
      />
      <div className="equals">=</div>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={(e) => setToCurrency(e.target.value)}
        onChangeAmount={handleToAmountChange}
        amount={toAmount}
      />
    </>
  );
}

export default App;
