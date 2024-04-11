import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import agent from "../../api/agent";
import {
  exchangeRatesResponseToData,
  transformExchangeRates,
} from "../transformers/exchangeRatesTransormer";
import { createAction } from "@reduxjs/toolkit";

const initialState: FindExchangeRate = {
  action: "",
  actionName: "",
  currency: "",
  amount: 0,
  longitude: 0,
  latitude: 0,
  exchangeRates: [],
  isLoadingExchangeRates: false,
  sortPreference: "rate",
  sortSettings: {
    bestRate: true,
    distance: false,
    openOnly: false,
  },
};

export const setSortPreference = createAction<string>(
  "findExchangeRate/setSortPreference"
);

export const setSortSettings = createAction<SortSettings>(
  "findExchangeRate/setSortSettings"
);

export const getExchangeRates = createAsyncThunk(
  "findExchangeRate/getExchangeRates",
  async (_, thunkAPI) => {
    try {
      const exchangeRatesData = await agent.FindExchangeRate.getExchangeRates(
        transformExchangeRates()
      );
      const tranformData = exchangeRatesResponseToData(exchangeRatesData);
      return tranformData;
    } catch (error) {
      throw new Error("Greska");
    }
  }
);

export const findExchangeRateSlice = createSlice({
  name: "findExchangeRate",
  initialState,
  reducers: {
    setAction: (state, action) => {
      state.action = action.payload.action;
    },
    setActionName: (state, action) => {
      state.actionName = action.payload.name;
    },
    resetActionName: (state, _action) => {
      state.actionName = "";
    },
    setCurrency: (state, action) => {
      state.currency = action.payload.currency;
    },
    resetCurrency: (state, _action) => {
      state.currency = "";
    },
    setAmount: (state, action) => {
      state.amount = action.payload;
    },
    setLongitude: (state, action) => {
      state.longitude = action.payload;
    },
    setLatitude: (state, action) => {
      state.latitude = action.payload;
    },
    setIsLoadingExchangeRates: (state, action) => {
      state.isLoadingExchangeRates = action.payload;
    },
    resetFilters: (state) => {
      state.sortPreference = initialState.sortPreference;
      state.sortSettings = initialState.sortSettings;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getExchangeRates.pending, (state) => {
      state.isLoadingExchangeRates = true;
    });
    builder.addCase(getExchangeRates.fulfilled, (state, action) => {
      state.exchangeRates = action.payload;
      state.isLoadingExchangeRates = false;
    });
    builder.addCase(getExchangeRates.rejected, (state) => {
      state.isLoadingExchangeRates = false;
    });
    builder.addCase(setSortPreference, (state, action) => {
      state.sortPreference = action.payload;
    });
    builder.addCase(setSortSettings, (state, action) => {
      state.sortSettings = action.payload;
    });
  },
});

export const {
  setAction,
  setActionName,
  resetActionName,
  setCurrency,
  resetCurrency,
  setAmount,
  setLongitude,
  setLatitude,
  setIsLoadingExchangeRates,
  resetFilters,
} = findExchangeRateSlice.actions;
