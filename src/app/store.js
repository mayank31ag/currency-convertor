import { configureStore } from "@reduxjs/toolkit";
import currencyReducer from "../features/currency/currencySlice";

export default configureStore({
  reducer: {
    currency: currencyReducer,
  },
});
