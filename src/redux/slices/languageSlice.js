import { createSlice } from "@reduxjs/toolkit";
import { getLanguagesList } from "../actions";

const initialState = {
  isLoading: true,
  error: null,
  data: [],
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLanguagesList.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(getLanguagesList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.data = [];
    });

    builder.addCase(getLanguagesList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.data = action.payload;
    });
  },
});

export default languageSlice.reducer;
