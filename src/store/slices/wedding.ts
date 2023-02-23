import {
  PayloadAction,
  SliceCaseReducers,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

export type SeatingChartEntry = string | string[];
export type SeatingChart = Record<string, SeatingChartEntry[]>;

export interface WeddingSeatingChartData {
    lastName: string
    bride: string,
    groom: string,
    date: string,
    time: string,
    location: string,
    seatingChart: SeatingChart,
}

interface WeddingState {
    data?: WeddingSeatingChartData,
    status: 'fulfilled' | 'loading' | 'rejected' | 'idle',
    errorMessage?: string,
}

export const fetchAppData = createAsyncThunk('wedding/fetchAppData', async () => {
  const url = process.env.REACT_APP_DATA_URL;
  if (!url) {
    throw new Error('REACT_APP_DATA_URL environment variable was not set when building the app');
  }
  const response = await fetch(url, {
    method: 'GET',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.status !== 200) {
    throw new Error(await response.text());
  } else {
    const contentType = response.headers.get('Content-Type');
    if (!contentType?.startsWith('application/json')) {
      throw new Error(
        `Invalid Content-Type: expected "application/json", received "${contentType}"`,
      );
    }
    return await response.json();
  }
});

export const weddingSlice = createSlice<WeddingState, SliceCaseReducers<WeddingState>, 'wedding'>({
  name: 'wedding',
  initialState: {
    data: undefined,
    status: 'idle',
    errorMessage: undefined,
  },
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAppData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAppData.fulfilled, (state, action: PayloadAction<WeddingSeatingChartData>) => {
        state.status = 'fulfilled';
        state.data = action.payload;
      })
      .addCase(fetchAppData.rejected, (state, action) => {
        state.status = 'rejected';
        state.errorMessage = action.error.message;
      });
  },
});

export const {saveData, setErrorMessage} = weddingSlice.actions;

export default weddingSlice.reducer;
