import { createSlice } from "@reduxjs/toolkit";
import { translateText } from "../actions";

const initialState = {
  isLoading: false,
  error: null,
  sourceLang: null,
  targetLang: null,
  textToTranslate: "",
  translatedText: "",
  translationHistory: [],
};

const tranlateSlice = createSlice({
  name: "translate",
  initialState,
  reducers: {
    setSource: (state, payload) => {
      state.sourceLang = payload;
    },
    setTarget: (state, payload) => {
      state.targetLang = payload;
    },
    setText: (state, payload) => {
      state.textToTranslate = payload;
    },
    swapLanguages: (state, payload) => {
      const val = state.sourceLang;
      state.sourceLang = state.targetLang;
      state.targetLang = val;

      const text = state.translatedText;
      state.translatedText = state.textToTranslate.payload;
      state.textToTranslate.payload = text;
    },
    changeLanguage: (state, payload) => {
      const val = state.sourceLang;
      state.sourceLang = state.targetLang;
      state.targetLang = val;
    },
    clearTextToTranslate: (state, payload) => {
      state.textToTranslate = "";
    },

    clearHistory: (state) => {
      state.translationHistory = [];
    },
  },

  extraReducers: (builder) => {
    builder.addCase(translateText.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(translateText.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(translateText.fulfilled, (state, action) => {
      state.isLoading = false;
      state.translatedText = action.payload;

      // translate'i gecmise kaydet
      if (state.textToTranslate && action.payload) {
        state.translationHistory.unshift({
          id: Date.now(),
          sourceText: state.textToTranslate,
          translatedText: state.translatedText,
          sourceLang: state.sourceLang,
          targetLang: state.targetLang,
          timeStamp: new Date().toLocaleDateString("tr"),
        });
      }
    });
  },
});

export const {
  setSource,
  setTarget,
  setText,
  swapLanguages,
  changeLanguage,
  clearTextToTranslate,
  clearHistory,
} = tranlateSlice.actions;

export default tranlateSlice.reducer;
