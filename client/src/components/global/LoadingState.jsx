import React from "react";

function LoadingState({ loadingText, icon }) {
  return (
    <div className="max-w-2xl m-auto mt-16">
      <div className="text-center px-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-t from-slate-200 to-slate-100 mb-4">
          {icon()}
        </div>
        <h2 className="text-2xl text-slate-800 font-bold mb-2">
          {loadingText}
        </h2>
      </div>
    </div>
  );
}

export default LoadingState;
