import React from "react";
import { Link } from "react-router-dom";

function RedirectButtonWithIcon({ linkTo, icon, linkText }) {
  return (
    <Link
      className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
      to={linkTo}
    >
      {icon()}
      <span className="hidden xs:block ml-2">{linkText}</span>
    </Link>
  );
}

export default RedirectButtonWithIcon;
