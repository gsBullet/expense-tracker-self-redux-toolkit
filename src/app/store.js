import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "../features/transation/transationsSlice";

export const store = configureStore({
  reducer: {
    transaction: transactionReducer,
  },
});
