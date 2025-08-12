import { ArrowRightLeft } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import { useDispatch } from "react-redux";
import {
  changeLanguage,
  setSource,
  setTarget,
  swapLanguages,
} from "../redux/slices/translateSlice";

const LanguageSelect = () => {
  const dispatch = useDispatch();
  const { isLoading, error, data } = useSelector((store) => store.language);
  const { targetLang, sourceLang, textToTranslate, translatedText } =
    useSelector((store) => store.translate);
  const [lan, setLan] = useState({});

  const [targetLan, setTargetLan] = useState();
  const [sourceLan, setSourceLan] = useState();

  const languages = useMemo(() => {
    if (!data.length) return [];

    const mappedData = data?.map((item) => {
      return {
        value: item.language,
        label: item.name,
      };
    });

    return [{ value: "detect", label: "Detect" }, ...mappedData];
  }, [data]);

  useEffect(() => {
    const userLanguage = navigator.language.split("-")[0];

    const foundLan = languages?.find((item) => item.value == userLanguage) || {
      value: "en",
      label: "English",
    };

    setLan(foundLan);
    dispatch(setSource({ value: "detect", label: "Detect" }));
    dispatch(setTarget(foundLan));
  }, [data]);

  // react-select stilleri
  const customStyles = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      backgroundColor: "#3f3f46",
      borderColor: state.isFocused ? "3b82f6" : "#52525b",
      borderWidth: "2px",
      borderRadius: "12px",
      minHeight: "48px",
      boxShadow: state.isFocused ? "0 0 0 1px #3b82f6" : "",
      "&:hover": {
        borderColor: "#3b82f6",
      },
    }),
    option: (baseStyles, state) => ({
      ...baseStyles,

      background: state.isSelected
        ? "#3b82f6"
        : state.isFocused
        ? "#52525b"
        : "#3f3f46",
      color: state.isSelected ? "white" : "#e4e4e7",
      padding: "12px 16px",
      cursor: "pointer",
      borderRadius: "5px",
    }),
    menu: (baseStyles, state) => ({
      ...baseStyles,
      backgroundColor: "#3f3f46",
      border: "1px solid #52525b",
      borderRadius: "12px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
    }),
    singleValue: (baseStyles, state) => ({
      ...baseStyles,
      color: "#e4e4e7",
    }),
    input: (baseStyles, state) => ({
      ...baseStyles,
      color: "#e4e4e7",
    }),
    placeholder: (baseStyles, state) => ({
      ...baseStyles,
      placeholder: "#a1a1aa",
    }),
  };

  const handleSource = (selected) => {
    if (sourceLang.payload.value === "detect") {
      dispatch(setSource(selected));
      setSourceLan(selected);
    }

    if (
      selected.value === targetLang.payload.value &&
      (textToTranslate.length == 0 || translatedText.length == 0)
    ) {
      dispatch(changeLanguage());
    } else if (
      selected.value === targetLang.payload.value &&
      !(textToTranslate.length == 0 || translatedText.length == 0)
    ) {
      dispatch(swapLanguages());
    } else {
      dispatch(setSource(selected));
      setSourceLan(selected);
    }
  };
  const handleTarget = (selected) => {
    if (
      selected.value === sourceLang.payload.value &&
      (textToTranslate.length == 0 || translatedText.length == 0)
    ) {
      dispatch(changeLanguage());
    } else if (
      selected.value === sourceLang.payload.value &&
      !(textToTranslate.length == 0 || translatedText.length == 0)
    ) {
      dispatch(swapLanguages());
    } else {
      dispatch(setTarget(selected));
    }

    setLan(selected);
    setTargetLan(selected);
  };
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center gap-3 lg:gap-10 flex-col lg:flex-row">
        {/* Kaynak Dil */}
        <div className="flex-1 w-full">
          <label className="block text-sm text-zinc-300 mb-2">Source Language</label>
          <Select
            options={languages}
            className="text-sm text-black"
            styles={customStyles}
            value={sourceLang?.payload}
            onChange={(selected) => {
              handleSource(selected);
            }}
          />
        </div>

        {/* Degistirme Butonu */}
        <div className="grid place-items-center  lg:mt-6">
          <button
            className="size-10 lg:size-12 bg-zinc-700 hover:bg-zinc-600 disabled:bg-zinc-800 disabled:opacity-50 rounded-full grid place-items-center cursor-pointer group"
            onClick={() => {
              if (!textToTranslate || !translatedText) {
                dispatch(changeLanguage());
              } else dispatch(swapLanguages());
            }}
            disabled={sourceLang?.payload?.value === "detect"}
          >
            <ArrowRightLeft />
          </button>
        </div>

        {/* Hedef Dil */}
        <div className="flex-1 w-full">
          <label className="block text-sm text-zinc-300 mb-2">Target Language</label>
          <Select
            options={languages}
            className="text-sm text-black"
            styles={customStyles}
            value={targetLang?.payload}
            onChange={(selected) => handleTarget(selected)}
          />
        </div>
      </div>

      {/* Dil Sayisi */}
      <div className="text-center">
        <p className="text-sm text-zinc-500 lg:my-10">
          Supported {data.length} languages
        </p>
      </div>
    </div>
  );
};

export default LanguageSelect;
