import { ArrowRight } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearHistory } from "../redux/slices/translateSlice";

const History = () => {
  const dispatch = useDispatch();
  const { translationHistory } = useSelector((store) => store.translate);

  return (
    <div className="mt-8 bg-zinc-800/30 rounded-xl p-4 border border-zinc-700/30">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-zinc-200">History</h3>

        {translationHistory.length !== 0 ? (
          <button
            onClick={() => dispatch(clearHistory())}
            className="text-xs text-zinc-400 hover:text-zinc-200 transition"
          >
            Clear History
          </button>
        ) : null}
      </div>

      <div className="space-y-3 max-h-60 overflow-y-auto">
        {translationHistory.map((item) => (
          <div
            key={item.id}
            className="bg-zinc-700/50 rounded-lg p-3 border border-zinc-600/30"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <span>{item.sourceLang.payload.label}</span>
                <span>
                  <ArrowRight className="size-3" />
                </span>
                <span>{item.targetLang.payload.label}</span>
              </div>
              <span className="text-xs text-zinc-500">{item.timeStamp}</span>
            </div>
            <div className="mt-2 space-y-2">
              <div>
                <p className="text-sm text-zinc-300 line-clamp-2">
                  {item.sourceText.payload}
                </p>
              </div>
              <div>
                <p className="text-sm text-zinc-200 line-clamp-2">
                  {item.translatedText}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
