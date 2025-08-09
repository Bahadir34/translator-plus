import { ArrowRight } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearTextToTranslate, setText } from "../redux/slices/translateSlice";

const TextContainer = () => {
  const dispatch = useDispatch();

  const { isLoading, error, translatedText, textToTranslate } = useSelector(
    (store) => store.translate
  );

 
  const handleCopy = () => {
    if (translatedText.length > 0)
      navigator.clipboard.writeText(translatedText);
  };

  return (
    <div className="flex gap-4 mt-6 lg:gap-8 flex-col lg:flex-row">
      <div className="flex-1">
        <div className="flex justify-between mb-2">
          <label htmlFor="source" className="text-sm text-zinc-300">
            Translating Text
          </label>
          {textToTranslate?.payload ? (
            <button
              onClick={() => dispatch(clearTextToTranslate())}
              className="text-xs text-zinc-400 hover:text-zinc-200"
            >
              Clear
            </button>
          ) : null}
        </div>
        <div className="relative">
          <textarea
            id="source"
            className="textarea"
            placeholder="Enter the text you want to translate..."
            value={textToTranslate.payload || ""}
            onChange={(e) => {
              dispatch(setText(e.target.value));
            }}
          ></textarea>
          <div className="absolute bottom-3 right-3 text-xs text-zinc-500">
            {(textToTranslate.payload &&
              textToTranslate.payload.length + "karekter") ||
              "0 karakter"}
          </div>
        </div>
      </div>
      <div className="m-auto">
        <div className="size-12 bg-gradient-to-br from-blue-200 to-purple-500 grid place-items-center rounded-full  max-lg:rotate-90">
          <ArrowRight />
        </div>
      </div>
      <div className="flex-1">
        <div className="flex justify-between mb-2">
          <label htmlFor="target" className="text-sm text-zinc-300">
            Translated Text
          </label>
          {textToTranslate?.payload ? (
            <button
              onClick={() => handleCopy()}
              className="text-xs text-zinc-400 hover:text-zinc-200"
            >
              Copy
            </button>
          ) : null}
        </div>
        <div className="relative">
          <textarea
            disabled
            id="target"
            className="textarea text-gray-200"
            placeholder="Translated text will be showed here..."
            value={translatedText}
          ></textarea>
          <div className="absolute inset-0 grid place-items-center">
            <div className="text-zinc-500 text-sm">
              {translatedText.length > 0 ? "" : "Waiting translating..."}
            </div>
          </div>
          <div className="absolute right-3 bottom-3">
            <p className="text-xs text-gray-500">
              {translatedText.length > 0
                ? translatedText.length + " character"
                : ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextContainer;
