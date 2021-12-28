import React, { useEffect, useState } from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow';

const BASE_URL =
  'http://api.exchangeratesapi.io/v1/latest?access_key=fc19f25be9a53c653b0e271b9b9026ff';

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  console.log(currencyOptions);
  // 1) get url api
  // 2) convert to json
  // 3) get base currency and arr with data of all other curr
  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) =>
        setCurrencyOptions([data.base, ...Object.keys(data.rates)])
      );
  }, []);

  return (
    <>
      <h1>!!!Currency Converter!!!</h1>
      <CurrencyRow currencyOptions={currencyOptions} />
      <div className="equals">=</div>
      <CurrencyRow currencyOptions={currencyOptions} />
    </>
  );
}

export default App;
