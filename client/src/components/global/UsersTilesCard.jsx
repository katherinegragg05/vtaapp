import { useState, useRef } from "react";
import { Navigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import { useConfirmRequestMutation } from "../../features/requests/requestsApiSlice";
import useAuth from "../../hooks/useAuth";
import Banners from "../alerts/Banners";
import LoadingState from "./LoadingState";

function UsersTilesCard({ docid, name, course, status, children }) {
  const { isManager, isAdmin } = useAuth();
  const errRef = useRef(null);
  const [confirmRequest, { isLoading, isSuccess, isError, error }] =
    useConfirmRequestMutation();
  //   const [confirmed, setConfirmed] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const canSave = [docid].every(Boolean) && !isLoading;

  const handleConfirm = async (confirmed) => {
    if (canSave) {
      try {
        await confirmRequest({ id: docid, confirmed });
      } catch (error) {
        setErrMsg(error?.message);
      }
    }
  };
  if (!isAdmin) {
    return <Navigate to="/app" replace />;
  }

  if (isLoading)
    return (
      <LoadingState
        loadingText="Loading, Please wait ..."
        icon={() => <PulseLoader color={"#3f1b1b"} />}
      />
    );
  return (
    <div className="col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
      <div className="my-2" ref={errRef}>
        {errMsg ? <Banners type="error" message={errMsg} /> : <></>}
      </div>
      <div className="flex flex-col h-full">
        {/* Card top */}
        <div className="grow p-5">
          <div className="flex justify-between items-start">
            {/* Image + name */}

            <header>
              <div className="flex mb-2">
                <div className="mt-1 pr-1">
                  <div className="inline-flex text-slate-800 hover:text-slate-900">
                    <h2 className="text-xl leading-snug justify-center font-semibold">
                      {name}
                    </h2>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-slate-400 -mt-0.5 mr-1">
                      -&gt;
                    </span>{" "}
                    <span>{course}</span>
                  </div>
                </div>
              </div>
            </header>
          </div>
          {/* Bio */}
          <div className="mt-2">
            <div className="text-sm">{children}</div>
          </div>
        </div>
        {/* Card footer */}
        {status === "Pending Verification" && (
          <div className="border-t border-slate-200">
            <div className="flex divide-x divide-slate-200r">
              <button
                className="block flex-1 text-center text-sm text-indigo-500 hover:text-indigo-600 font-medium px-3 py-4"
                onClick={() => handleConfirm("confirmed")}
              >
                <div className="flex items-center justify-center">
                  <span>✅</span>
                  <span>Confirm Request</span>
                </div>
              </button>
              <button
                className="block flex-1 text-center text-sm text-slate-600 hover:text-slate-800 font-medium px-3 py-4 group"
                onClick={() => handleConfirm("denied")}
              >
                <div className="flex items-center justify-center">
                  <span>🚫</span>
                  <span>Deny</span>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UsersTilesCard;
