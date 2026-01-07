import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import tourService from '../../services/tour.service';

const initialState = {
  tours: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Helper to get token
const getToken = (thunkAPI) => {
    // In a real app, you might store token in localStorage or get it from auth state
    // For now, let's assume the auth state has it or we grab it from the user object in localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    // Note: In our backend login response, we sent { user, accessToken }. 
    // If you stored the whole object in localStorage, access it there.
    // If you used HttpOnly cookies (which we did in backend), we actually don't need to send the token manually in headers!
    // However, if your axios setup doesn't auto-send cookies, we might need it.
    // Since we set `axios.defaults.withCredentials = true` in auth.service, cookies should be sent automatically.
    return null; // We rely on cookies
};

// Get user tours
export const getTours = createAsyncThunk('tours/getAll', async (_, thunkAPI) => {
  try {
    // Since we use HttpOnly cookies, we don't need to pass token manually if credentials=true
    return await tourService.getTours();
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Create new tour
export const createTour = createAsyncThunk('tours/create', async (tourData, thunkAPI) => {
  try {
    return await tourService.createTour(tourData);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const tourSlice = createSlice({
  name: 'tour',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTours.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTours.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // The backend returns { statusCode: 200, data: { tours: [], totalTours: 0 }, ... }
        state.tours = action.payload.data.tours; 
      })
      .addCase(getTours.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createTour.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTour.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tours.unshift(action.payload.data); // Add new tour to top of list
      })
      .addCase(createTour.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = tourSlice.actions;
export default tourSlice.reducer;