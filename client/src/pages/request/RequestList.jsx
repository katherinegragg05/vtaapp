import React from "react";
import PulseLoader from "react-spinners/PulseLoader";
import Banners from "../../components/alerts/Banners";
import EmptyState from "../../components/global/EmptyState";
import LoadingState from "../../components/global/LoadingState";
import RedirectButtonWithIcon from "../../components/global/RedirectButtonWithIcon";
import RequestListItem from "../../components/request/RequestListItem";
import { useGetRequestsQuery } from "../../features/requests/requestsApiSlice";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";

function RequestList() {
  useTitle("Requests - VTAAPP | UCC-Congress");

  const { accountId, isManager, isAdmin } = useAuth();

  const {
    data: requests,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetRequestsQuery("requestsList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;
  console.log(requests);
  if (isLoading) {
    return (
      <LoadingState
        loadingText="Loading, Please wait ..."
        icon={() => <PulseLoader color={"#3f1b1b"} />}
      />
    );
  }

  if (!requests) {
    return (
      <EmptyState
        linkTo="new"
        btnText="New Request"
        title="Create your First Request"
        bodyText="By creating a request, the admin will be able to deliver that when requirements are fulfilled"
      />
    );
  }
  if (isError) {
    content = <Banners type="error" message={error?.data?.message} />;
  }

  const { entities } = requests;

  const dataArr = Object.values(entities);
  return (
    <main>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        {/* Page header */}
        <div className="sm:flex sm:justify-between sm:items-center mb-5">
          {/* Left: Title */}
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">
              Requests 📝
            </h1>
          </div>

          {/* Post a job button */}
          <RedirectButtonWithIcon
            linkText="New Request"
            linkTo="new"
            icon={() => (
              <svg
                className="w-4 h-4 fill-current opacity-50 shrink-0"
                viewBox="0 0 16 16"
              >
                <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
              </svg>
            )}
          />
        </div>

        {/* Page content */}
        <div className="flex flex-col space-y-10 sm:flex-row sm:space-x-6 sm:space-y-0 md:flex-col md:space-x-0 md:space-y-10 xl:flex-row xl:space-x-6 xl:space-y-0 mt-9">
          {/* Content */}
          <div className="w-full">
            {/* Search form */}
            <div className="mb-5">
              <form className="relative">
                <label htmlFor="job-search" className="sr-only">
                  Search
                </label>
                <input
                  id="job-search"
                  className="form-input w-full pl-9 focus:border-slate-300"
                  type="search"
                  placeholder="Search by keywords ..."
                />
                <button
                  className="absolute inset-0 right-auto group"
                  type="submit"
                  aria-label="Search"
                >
                  <svg
                    className="w-4 h-4 shrink-0 fill-current text-slate-400 group-hover:text-slate-500 ml-3 mr-2"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                    <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
                  </svg>
                </button>
              </form>
              <div className="my-2">{content}</div>
            </div>

            {/* Request header */}
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm text-slate-500 italic">
                Showing {dataArr?.length || 0} Request(s)
              </div>
              {/* Sort */}
              <div className="text-sm">
                {/* <span>Sort by </span> */}
                {/* <DropdownSort align="right" /> */}
              </div>
            </div>

            {/* Request list */}
            <div className="space-y-2">
              {dataArr?.length ? (
                dataArr.map((request) => (
                  <RequestListItem
                    key={request?._id}
                    purpose={request?.purpose}
                    id={request?._id}
                    documentRequested={request?.documentRequested}
                    status={request?.status}
                    isRescheduled={request?.isRescheduled}
                    isServed={request?.isServed}
                    createdAt={request?.createdAt}
                  />
                ))
              ) : (
                <EmptyState
                  linkTo="new"
                  btnText="New Request"
                  title="Create your First Request"
                  bodyText="By creating a request, the admin will be able to deliver that when requirements are fulfilled"
                />
              )}
            </div>

            {/* Pagination */}
          </div>
        </div>
      </div>
    </main>
  );
}

export default RequestList;
