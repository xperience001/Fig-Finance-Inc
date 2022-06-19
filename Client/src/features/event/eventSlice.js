import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import eventServices from "./eventServices";

const initialState = {
  events: {
    events: [],
    pageDetails: {
      page: 1,
      perPage: 10,
      totalCount: 1,
      totalPages: 1,
    },
  },
  event: {},
  myEvents: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  isSaving: false,
  message: "",
};

export const getAllEvents = createAsyncThunk(
  "/events",
  async (query, thunkAPI) => {
    try {
      return await eventServices.getAllEvents(query);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getMyEvents = createAsyncThunk(
  "/my-events",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await eventServices.getMyEvents(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addEvent = createAsyncThunk(
  "/add-event",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await eventServices.addEvent(data, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateEvent = createAsyncThunk(
  "/update-event",
  async (id, data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await eventServices.updateEvent(id, data, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const removeEvent = createAsyncThunk(
  "/remove-event",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await eventServices.removeEvent(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const saveEvent = createAsyncThunk(
  "/save-event",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await eventServices.saveEvent(data, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getRecommendations = createAsyncThunk(
  "/recommendations",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await eventServices.getRecommendations(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllEvents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.events.events = action.payload.events;
        state.events.pageDetails = action.payload.pageDetails;
      })
      .addCase(getAllEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.events = null;
      })
      .addCase(getMyEvents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.myEvents = action.payload;
      })
      .addCase(getMyEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.myEvents = null;
      })
      .addCase(addEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.events.events.push(action.payload);
      })
      .addCase(addEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.event = action.payload;
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(removeEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.events.events.filter((event) => event._id !== action.payload);
      })
      .addCase(removeEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(saveEvent.pending, (state) => {
        state.isSaving = true;
      })
      .addCase(saveEvent.fulfilled, (state, action) => {
        state.isSaving = false;
        state.isSuccess = true;
        state.myEvents.push(action.payload.data);
        state.message = action.payload.message;
      })
      .addCase(saveEvent.rejected, (state, action) => {
        state.isSaving = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getRecommendations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRecommendations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.events.events = action.payload.events;
        state.events.pageDetails = action.payload.pageDetails;
      })
      .addCase(getRecommendations.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.events = null;
      });
  },
});

export const { reset } = eventSlice.actions;
export default eventSlice.reducer;
