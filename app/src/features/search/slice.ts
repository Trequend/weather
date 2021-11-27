import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { City } from '../../types';

type State = {
  query: string;
  cities: Array<City>;
  total: number;
  loading: boolean;
  error?: unknown;
};

export const SEARCH_SLICE_NAME = 'search';

export const citiesInitialState: State = {
  query: '',
  cities: [],
  total: 0,
  loading: false,
};

const slice = createSlice({
  name: SEARCH_SLICE_NAME,
  initialState: citiesInitialState,
  reducers: {
    clear: (state) => {
      state.total = 0;
      state.query = '';
      state.cities = [];
    },
    spliceCities: (state, action: PayloadAction<number>) => {
      state.cities.splice(action.payload);
    },
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    startFetch: (state) => {
      state.loading = true;
      state.error = undefined;
    },
    successFetch: (
      state,
      action: PayloadAction<{ total: number; cities: Array<City> }>
    ) => {
      state.loading = false;
      state.total = action.payload.total;
      state.cities = state.cities.concat(action.payload.cities);
    },
    errorFetch: (state, action: PayloadAction<unknown>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const fetchCities = createAsyncThunk(
  `${SEARCH_SLICE_NAME}/fetch`,
  async (
    { offset, limit }: { offset: number; limit: number },
    { dispatch, getState }
  ) => {
    dispatch(slice.actions.spliceCities(offset));
    dispatch(slice.actions.startFetch());
    const { [SEARCH_SLICE_NAME]: state } = getState() as {
      [SEARCH_SLICE_NAME]: State;
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_WEATHER_API}/cities?query=${state.query}&offset=${offset}&limit=${limit}`
      );
      if (!response.ok) {
        throw new Error('Fetch error');
      }

      const json: { total: number; cities: Array<City> } =
        await response.json();
      dispatch(slice.actions.successFetch(json));
    } catch (error) {
      dispatch(slice.actions.errorFetch(error));
    }
  }
);

export const searchActions = Object.freeze({
  fetchCities,
  ...slice.actions,
});

export const searchReducer = slice.reducer;
