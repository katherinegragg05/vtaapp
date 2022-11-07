import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import useTitle from "../../hooks/useTitle";
import LoadingState from "../../components/global/LoadingState";
import PulseLoader from "react-spinners/PulseLoader";
import { useRegisterMutation } from "../../features/auth/authApiSlice";
import Banners from "../../components/alerts/Banners";
import FileDropzone from "../../components/global/FileDropzone";
import { useAddNewRequestMutation } from "../../features/requests/requestsApiSlice";

function NewRequest() {
  useTitle("New Request - VTAAPP | UCC-Congress");

  const userRef = useRef(null);
  const errRef = useRef(null);
  const [purpose, setPurpose] = useState("");
  const [documentRequested, setDocumentRequested] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [middleInitial, setMiddleInitial] = useState("");
  // const [type, setType] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  // const [isAcceptedDataPrivacy, setIsAcceptedDataPrivacy] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [addNewRequest, { isLoading, isSuccess, isError, error }] =
    useAddNewRequestMutation();

  useEffect(() => {
    userRef?.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [purpose, documentRequested]);
  const canSave = [purpose, documentRequested].every(Boolean) && !isLoading;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (canSave) {
        await addNewRequest({
          purpose,
          documentRequested,
        }).unwrap();
        navigate("/app/request");
      } else {
        alert("Please provide required fields.");
        return;
      }

      setDocumentRequested("");
      setPurpose("");
    } catch (err) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else {
        setErrMsg(err.data?.message);
      }
      errRef.current.focus();
    }
  };

  // const handleUserInput = (e) => setAccountId(e.target.value);
  // const handleFirstNameInput = (e) => setFirstName(e.target.value);
  // const handleLastNameInput = (e) => setLastName(e.target.value);
  // const handleMiddleInitInput = (e) => setMiddleInitial(e.target.value);
  const handleSetDocument = (e) => setDocumentRequested(e.target.value);
  const handleSetPurpose = (e) => setPurpose(e.target.value);
  // const handleEmailInput = (e) => setEmail(e.target.value);
  // const handlePwdInput = (e) => setPassword(e.target.value);
  // const handleConfrmPwdInput = (e) => setConfirmPassword(e.target.value);
  // const handleAcceptDataPrivacy = (e) =>
  //   setIsAcceptedDataPrivacy(!isAcceptedDataPrivacy);

  if (isLoading)
    return (
      <LoadingState
        loadingText="Loading, Please wait ..."
        icon={() => <PulseLoader color={"#3f1b1b"} />}
      />
    );
  return (
    <main>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        {/* Page header */}
        <div className="mb-8 flex space-x-2 items-center">
          <div className="">
            <Link
              to="/app/request"
              className="font-bold p-2 border border-teal-600 rounded-md"
            >
              ⬅
            </Link>
          </div>
          <h1 className="text-lg md:text-2xl text-slate-800 font-bold">
            Create new request 🧪
          </h1>
        </div>

        <div className="border-t border-slate-400">
          {" "}
          <div className="max-w-sm mx-auto px-4 py-8">
            {/* Form */}
            <div className="my-2" ref={errRef}>
              {errMsg ? <Banners type="error" message={errMsg} /> : <></>}
            </div>
            <form className="form" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="role"
                  >
                    Documents <span className="text-rose-500">*</span>
                  </label>
                  <select
                    id="role"
                    className="form-select w-full"
                    onChange={handleSetDocument}
                    value={documentRequested}
                    required
                  >
                    <option value="">------</option>
                    <option value="Good Moral">Good Moral</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Transcript of Record(TOR)">
                      Transcript of Record(TOR)
                    </option>
                    <option value="Certification of Graduation">
                      Certification of Graduation
                    </option>
                    <option value="Scholastic Record">Scholastic Record</option>
                    <option value=" Adding/dropping/Changing of subjects">
                      Adding/dropping/Changing of subjects
                    </option>
                    <option value="Application for Latin honor/Special Recognition">
                      Application for Latin honor/Special Recognition
                    </option>
                    <option value="Application for removal of incomplete grades">
                      Application for removal of incomplete grades
                    </option>
                    <option value="Order of Paymen">Order of Payment</option>
                  </select>
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="role"
                  >
                    Purpose <span className="text-rose-500">*</span>
                  </label>
                  <select
                    id="role"
                    className="form-select w-full"
                    onChange={handleSetPurpose}
                    value={purpose}
                    required
                  >
                    <option value="">------</option>
                    <option value="For Employment">For Employment</option>
                    <option value="For Board Examination">
                      For Board Examination
                    </option>
                    <option value="For Board Examination">
                      For Internship/OJT
                    </option>
                    <option value="For Personal Requirements">
                      For Personal Requirements
                    </option>
                  </select>
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="role"
                  >
                    Upload Files needed <span className="text-rose-500">*</span>
                  </label>
                  <FileDropzone />
                </div>
                <button
                  className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3 whitespace-nowrap"
                  type="submit"
                >
                  Register
                </button>
              </div>
            </form>
            {/* Footer */}
          </div>
        </div>
      </div>
    </main>
  );
}

export default NewRequest;
