import { Languages } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { translateText } from "../redux/actions";

const Button = () => {
  const dispatch = useDispatch();
  const { isLoading, textToTranslate } = useSelector(
    (store) => store.translate
  );

  return (
    <div className="flex justify-center mt-10">
      <button
        disabled={isLoading || !textToTranslate?.payload?.trim()}
        className={`relative px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 disabled:from-gray-400 disabled:to-black disabled:scale-100 disabled:cursor-wait`}
        onClick={() => {
          dispatch(translateText());
        }}
      >
        <div className="flex items-center gap-2">
          <Languages className="size-5" />
          <span>Translate</span>
        </div>
      </button>
    </div>
  );
};

export default Button;
