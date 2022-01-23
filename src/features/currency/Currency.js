import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setAmount,
  setToCurrency,
  setConvertAmount,
  fetchCurrencyOptions,
  getState,
  CONSTANTS,
} from "./currencySlice";

export const covertAmount = (currency, amount) =>
  (currency * amount).toFixed(2);

export function Currency() {
  const {
    fromCurrency,
    toCurrency,
    amount,
    convertAmount,
    currencyOptions,
    currencyMap,
  } = useSelector(getState);

  const dispatch = useDispatch();
  useEffect(() => setConversionRate(CONSTANTS.INITIAL_CURRENCY), []);

  const setConversionRate = (currency) =>
    dispatch(fetchCurrencyOptions(currency));

  const OptionsList = ({ label = "From", selected, onChange, options }) => (
    <div>
      <h3>{label}</h3>
      <select
        onChange={(e) => {
          onChange(e.target.value);
        }}
        value={selected}
      >
        {options &&
          options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
      </select>
    </div>
  );

  return (
    <div>
      <h1>Currency converter</h1>
      <div>
        <h3>Amount</h3>
        <input
          type="text"
          placeholder="Enter the amount"
          onChange={(e) => dispatch(setAmount(e.target.value))}
        />
      </div>
      {currencyOptions && (
        <>
          <OptionsList
            onChange={(val) => setConversionRate(val)}
            options={currencyOptions}
            selected={fromCurrency}
          />
          <OptionsList
            label="To"
            onChange={(currency) => {
              dispatch(setToCurrency(currency));
              dispatch(
                setConvertAmount(covertAmount(currencyMap[currency], amount))
              );
            }}
            options={currencyOptions}
            selected={toCurrency}
          />
        </>
      )}
      <br />
      <button
        onClick={() => {
          console.log(currencyMap[toCurrency], toCurrency, amount);
          dispatch(
            setConvertAmount(covertAmount(currencyMap[toCurrency], amount))
          );
        }}
      >
        Convert Now
      </button>
      <br />
      <br />
      <div>
        {fromCurrency && <span>{`${amount} ${fromCurrency}`} = </span>}
        {toCurrency && <span>{`${convertAmount} ${toCurrency}`} </span>}
      </div>
    </div>
  );
}
