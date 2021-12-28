import React from 'react';

export default function CurrencyRow(props) {
  const { currencyOptions } = props;
  return (
    <div>
      <input type="number" />
      <select name="" id="">
        {currencyOptions.map((option) => (
          <option value={option}>{option}</option>
        ))}
        <option value="Hi">Hi</option>
      </select>
    </div>
  );
}
