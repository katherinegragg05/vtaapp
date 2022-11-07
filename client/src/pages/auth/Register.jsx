import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";
import { useRegisterMutation } from "../../features/auth/authApiSlice";

import useTitle from "../../hooks/useTitle";
import PulseLoader from "react-spinners/PulseLoader";

import AuthImage from "../../img/1665802941095.png";
import AuthDecoration from "../../img/auth-decoration.png";
import Banners from "../../components/alerts/Banners";

const Register = () => {
  useTitle("Login - VTAAPP | UCC-Congress");

  const userRef = useRef(null);
  const errRef = useRef(null);
  const [accountId, setAccountId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleInitial, setMiddleInitial] = useState("");
  const [type, setType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAcceptedDataPrivacy, setIsAcceptedDataPrivacy] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, { isLoading }] = useRegisterMutation();

  useEffect(() => {
    userRef?.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [accountId, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { success } = await register({
        accountId,
        isAcceptedDataPrivacy,
        firstName,
        lastName,
        middleInitial,
        type,
        email,
        password,
        confirmPassword,
      }).unwrap();

      setAccountId("");
      setFirstName("");
      setLastName("");
      setMiddleInitial("");
      setPassword("");
      if (success) navigate("/login");
      else alert("error");
    } catch (err) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else {
        setErrMsg(err.data?.message);
      }
      errRef.current.focus();
    }
  };

  const handleUserInput = (e) => setAccountId(e.target.value);
  const handleFirstNameInput = (e) => setFirstName(e.target.value);
  const handleLastNameInput = (e) => setLastName(e.target.value);
  const handleMiddleInitInput = (e) => setMiddleInitial(e.target.value);
  const handleSetType = (e) => setType(e.target.value);
  const handleEmailInput = (e) => setEmail(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);
  const handleConfrmPwdInput = (e) => setConfirmPassword(e.target.value);
  const handleAcceptDataPrivacy = (e) =>
    setIsAcceptedDataPrivacy(!isAcceptedDataPrivacy);

  if (isLoading) return <PulseLoader color={"#FFF"} />;

  return (
    <main className="bg-white">
      <div className="relative md:flex">
        {/* Content */}
        <div className="md:w-1/2">
          <div className="min-h-screen h-full flex flex-col after:flex-1">
            {/* Header */}
            <div className="flex-1">
              <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link className="block" to="/app">
                  <svg width="32" height="32" viewBox="0 0 32 32">
                    <defs>
                      <linearGradient
                        x1="28.538%"
                        y1="20.229%"
                        x2="100%"
                        y2="108.156%"
                        id="logo-a"
                      >
                        <stop stopColor="#A5B4FC" stopOpacity="0" offset="0%" />
                        <stop stopColor="#A5B4FC" offset="100%" />
                      </linearGradient>
                      <linearGradient
                        x1="88.638%"
                        y1="29.267%"
                        x2="22.42%"
                        y2="100%"
                        id="logo-b"
                      >
                        <stop stopColor="#38BDF8" stopOpacity="0" offset="0%" />
                        <stop stopColor="#38BDF8" offset="100%" />
                      </linearGradient>
                    </defs>
                    <rect fill="#6366F1" width="32" height="32" rx="16" />
                    <path
                      d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z"
                      fill="#4F46E5"
                    />
                    <path
                      d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z"
                      fill="url(#logo-a)"
                    />
                    <path
                      d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z"
                      fill="url(#logo-b)"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="max-w-sm mx-auto px-4 py-8">
              <h1 className="text-3xl text-slate-800 font-bold mb-6">
                Create your Account 🚀
              </h1>
              {/* Form */}
              <div className="my-2" ref={errRef}>
                {errMsg ? <Banners type="error" message={errMsg} /> : <></>}
              </div>
              <form className="form" onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="Account"
                    >
                      Account/Student ID{" "}
                      <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="Account"
                      className="form-input w-full"
                      type="text"
                      ref={userRef}
                      value={accountId}
                      onChange={handleUserInput}
                      autoComplete="off"
                      required
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="firstName"
                    >
                      First Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="firstName"
                      className="form-input w-full"
                      type="text"
                      value={firstName}
                      onChange={handleFirstNameInput}
                      autoComplete="off"
                      required
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="lastName"
                    >
                      Last Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="lastName"
                      className="form-input w-full"
                      type="text"
                      value={lastName}
                      onChange={handleLastNameInput}
                      autoComplete="off"
                      required
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="middleInitial"
                    >
                      Middle Initial
                    </label>
                    <input
                      id="middleInitial"
                      className="form-input w-full"
                      type="text"
                      value={middleInitial}
                      onChange={handleMiddleInitInput}
                      autoComplete="off"
                      required
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="role"
                    >
                      Account Type <span className="text-rose-500">*</span>
                    </label>
                    <select
                      id="role"
                      className="form-select w-full"
                      onChange={handleSetType}
                      value={type}
                      required
                    >
                      <option value="">------</option>
                      <option value="STUDENT">Student</option>
                      <option value="ALUMNI">Alumni</option>
                    </select>
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="password"
                    >
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="form-input w-full"
                      onChange={handleEmailInput}
                      value={email}
                      autoComplete="off"
                      required
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="password"
                    >
                      Password <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="form-input w-full"
                      onChange={handlePwdInput}
                      value={password}
                      autoComplete="new-password"
                      required
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="confirmPassword"
                    >
                      Confirm Password <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="password"
                      id="confirmPasswrd"
                      className="form-input w-full"
                      onChange={handleConfrmPwdInput}
                      value={confirmPassword}
                      autoComplete="new-password"
                      required
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <div className="mr-1">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        onChange={handleAcceptDataPrivacy}
                        checked={isAcceptedDataPrivacy}
                      />
                      <span className="text-xs ml-2">
                        By checking this, you accept the{" "}
                        <Link
                          className="font-medium text-indigo-500 hover:text-indigo-600"
                          to="#data-privacy"
                        >
                          Data Privacy
                        </Link>
                      </span>
                    </label>
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
              <div className="pt-5 mt-6 border-t border-slate-200">
                <div className="text-sm">
                  Have an account?{" "}
                  <Link
                    className="font-medium text-indigo-500 hover:text-indigo-600"
                    to="/login"
                  >
                    Login Here
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Image */}
        <div
          className="hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2"
          aria-hidden="true"
        >
          <img
            className="object-cover object-center w-full h-full"
            src={AuthImage}
            width="760"
            height="1024"
            alt="Authentication"
          />
          <img
            className="absolute top-1/4 left-0 transform -translate-x-1/2 ml-8 hidden lg:block"
            src={AuthDecoration}
            width="218"
            height="224"
            alt="Authentication decoration"
          />
        </div>
      </div>
    </main>
  );
};
export default Register;
