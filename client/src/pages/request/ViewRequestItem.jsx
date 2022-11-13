import { useState } from "react";

import moment from "moment";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import { useGetRequestsQuery } from "../../features/requests/requestsApiSlice";

import PendingPayment from "../../components/request/PendingPayment";

function ViewRequestItem() {
  const { id } = useParams();

  const { request, isLoading } = useGetRequestsQuery("requestsList", {
    selectFromResult: ({ data }) => ({
      request: data?.entities[id],
    }),
  });

  // if (!request && !isLoading) {
  //   return <Navigate to="/app/request" state={{ from: location }} replace />;
  // }
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
                to="/app/request"
              >
                <svg
                  className="fill-current text-slate-400 mr-2"
                  width="7"
                  height="12"
                  viewBox="0 0 7 12"
                >
                  <path d="M5.4.6 6.8 2l-4 4 4 4-1.4 1.4L0 6z" />
                </svg>
                <span>Back To Requests</span>
              </Link>
            </div>
            <div className="text-xs text-slate-500 italic mb-2 flex items-center space-x-4">
              <div>Requested {moment(request?.createdAt).format("ll")}</div>
              <div className="text-xs inline-flex font-medium bg-indigo-100 text-indigo-600 rounded-full text-center px-2.5 py-1 border-indigo-300 border">
                {request?.status}
              </div>
            </div>
            <header className="mb-4">
              {/* Title */}
              <div className="flex items-center space-x-2 ">
                Document:{" "}
                <p className="text-base md:text-lg font-bold">
                  {" "}
                  {request?.documentRequested}
                </p>
              </div>
            </header>
            <div className="flex items-center space-x-2 mb-8">
              Purpose:{" "}
              <p className="text-base md:text-lg font-bold">
                {request?.purpose}
              </p>
            </div>

            {request?.status === "Pending Payment" && (
              <PendingPayment docId={id} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default ViewRequestItem;
