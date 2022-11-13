import React from "react";

function DownloadOR() {
  return (
    <>
      <div>
        <h2 className="font-semibold text-2xl text-red-400">
          {" "}
          PLEASE DOWNLOAD THE ORDER OF PAYMENT AND THEN PAY AT THE TREASURER
        </h2>
      </div>
      <div>
        <a
          className="btn bg-indigo-500 hover:bg-indigo-600 text-white whitespace-nowrap w-full"
          href="https://uccvtaappbucket.s3.ap-southeast-1.amazonaws.com/Order+of+Payment.pdf"
          download={true}
          target="_blank"
          rel="noreferrer"
        >
          Download Order of Payment
        </a>
      </div>
    </>
  );
}

export default DownloadOR;
