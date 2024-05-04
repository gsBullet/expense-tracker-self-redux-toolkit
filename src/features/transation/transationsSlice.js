import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addTransaction,
  deleteTransaction,
  getTransactions,
  updateTransaction,
} from "./transactionsAPI";

const initialState = {
  transactions: [],
  isError: false,
  isLoading: false,
  error: null,
  editing:{}
};

// thunk
export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async () => {
    const transactons = await getTransactions();
    return transactons;
  }
);

export const createTransactions = createAsyncThunk(
  "transactions/createTransaction",
  async (data) => {
    const transacton = await addTransaction(data);
    return transacton;
  }
);

export const removeTransactions = createAsyncThunk(
  "transactions/removeTransaction",
  async (id) => {
    const transacton = await deleteTransaction(id);
    return transacton;
  }
);

export const changeTransactions = createAsyncThunk(
  "transactions/changeTransactions",
  async ({ id, data }) => {
    const transaction = await updateTransaction({ id, data });
    return transaction;
  }
);

// slice

const transactionsSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    editActive: (state, action) => {
      state.editing = action.payload
    },
    editInActive: (state) => {
      state.editing = {}
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
        state.transactions = [];
      })

      .addCase(createTransactions.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(createTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.transactions.push(action.payload);
      })
      .addCase(createTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.transactions = [];
        state.error = action.error?.message;
      })

      .addCase(changeTransactions.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(changeTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        const index = state.transactions.findIndex(
          (t) => t.id === action.payload.id
        );
        state.transactions[index] = action.payload;
      })
      .addCase(changeTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.transactions = [];
        state.error = action.error?.message;
      })

      .addCase(removeTransactions.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(removeTransactions.fulfilled, (state, action) => {
        // console.log(action);
        state.isLoading = false;
        state.isError = false;
        state.transactions = state.transactions.filter(
          (transaction) => transaction.id !== action.meta?.arg
        );
      })
      .addCase(removeTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.transactions = [];
        state.error = action.error?.message;
      });
  },
});

export default transactionsSlice.reducer;

export const { editActive, editInActive } = transactionsSlice.actions;

