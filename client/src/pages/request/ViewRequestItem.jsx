import React from "react";
import { Link, useParams } from "react-router-dom";

function ViewRequestItem() {
  const { id } = useParams();
  console.log(id);
  return (
    <main>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Page content */}
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row lg:space-x-8 xl:space-x-16">
          {/* Content */}
          <div>
            <div className="mb-6">
              <Link
                className="btn-sm px-3 bg-white border-slate-200 hover:border-slate-300 text-slate-600"
                to="/job/job-listing"
              >
                <svg
                  className="fill-current text-slate-400 mr-2"
                  width="7"
                  height="12"
                  viewBox="0 0 7 12"
                >
                  <path d="M5.4.6 6.8 2l-4 4 4 4-1.4 1.4L0 6z" />
                </svg>
                <span>Back To Jobs</span>
              </Link>
            </div>
            <div className="text-sm text-slate-500 italic mb-2">
              Posted Jan 6, 2022
            </div>
            <header className="mb-4">
              {/* Title */}
              <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">
                Senior Client Engineer (React &amp; React Native)
              </h1>
            </header>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ViewRequestItem;
