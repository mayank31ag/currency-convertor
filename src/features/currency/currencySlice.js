import { createSlice } from "@reduxjs/toolkit";
import { covertAmount } from "./Currency";

export const CONSTANTS = {
  BASE_URL:
    "https://v6.exchangerate-api.com/v6/92f2d592ea7842dbbaee4a85/latest/",
  INITIAL_CURRENCY: "USD",
};

export const slice = createSlice({
  name: "currency",
  initialState: {
    amount: 0,
    convertAmount: 0,
    fromCurrency: 0,
    toCurrency: 0,
    currencyMap: {},
    currencyOptions: [],
  },
  reducers: {
    setAmount: (state, action) => {
      state.amount = action.payload;
      state.convertAmount = covertAmount(
        state.currencyMap[state.toCurrency],
        action.payload
      );
    },
    setFromCurrency: (state, action) => {
      state.fromCurrency = action.payload;
    },
    setToCurrency: (state, action) => {
      state.toCurrency = action.payload;
    },
    setConvertAmount: (state, action) => {
      state.convertAmount = action.payload;
    },
    setCurrencyOptions: (state, action) => {
      state.currencyOptions = [...Object.keys(action.payload)];
      state.currencyMap = action.payload;
    },
  },
});

export const {
  setAmount,
  setFromCurrency,
  setToCurrency,
  setConvertAmount,
  setCurrencyOptions,
} = slice.actions;

export const fetchCurrencyOptions =
  (currency = CONSTANTS.INITIAL_CURRENCY) =>
  (dispatch) => {
    fetch(`${CONSTANTS.BASE_URL}${currency}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(setFromCurrency(currency));
        dispatch(setToCurrency(currency));
        dispatch(setCurrencyOptions(data.conversion_rates));
      });
  };

export const getState = (state) => state.currency;

export default slice.reducer;
