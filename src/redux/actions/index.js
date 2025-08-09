import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

// dil listesini getir
export const getLanguagesList = createAsyncThunk(
  "language/getLanguageList",
  async () => {
    const res = await api.get("/languages");

    return res.data.languages;
  }
);

export const translateText = createAsyncThunk(
  "/translate/translateText",
  async (_, { getState }) => {
    const { translate } = getState();

    let lang = translate.sourceLang.payload.value;

    if (translate.sourceLang.payload.value === "detect") {
      const langRes = await api.post("/detect", {
        q: translate.textToTranslate.payload,
      });

      lang = langRes.data.data.detections[0].language;
    }

    const res = await api.post("", {
      q: translate.textToTranslate.payload,
      source: lang,
      target: translate.targetLang.payload.value,
    });

    return res.data.data.translations.translatedText[0];
  }
);
