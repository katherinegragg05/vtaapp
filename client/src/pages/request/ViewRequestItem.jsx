import { useState } from "react";
import AWS from "aws-sdk";
import moment from "moment";
import { Link, useParams } from "react-router-dom";
import { useGetRequestsQuery } from "../../features/requests/requestsApiSlice";
import FileDropzone from "../../components/global/FileDropzone";

const S3_BUCKET = "uccvtaappbucket";
const REGION = "global";

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || "AKIARNUHZT6X4B3HWQW2",
  secretAccessKey:
    process.env.AWS_SECRET_KEY || "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",
});

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});
function ViewRequestItem() {
  const { id } = useParams();
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadFile = (file) => {
    const params = {
      ACL: "public-read",
      Body: file,
      Bucket: S3_BUCKET,
      Key: file.name,
    };

    myBucket
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        setProgress(Math.round((evt.loaded / evt.total) * 100));
      })
      .send((err) => {
        if (err) console.log(err);
      });
  };
  const { request } = useGetRequestsQuery("requestsList", {
    selectFromResult: ({ data }) => ({
      request: data?.entities[id],
    }),
  });
  console.log(request);
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
            <div className="flex flex-col space-y-4">
              <div>
                <h2 className="font-semibold text-2xl text-red-400">
                  {" "}
                  PLEASE DOWNLOAD THE ORDER OF PAYMENT AND THEN PAY AT THE
                  TREASURER
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
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="role"
                >
                  Upload Receipt<span className="text-rose-500">*</span>
                </label>
                <FileDropzone setFile={handleFileInput} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ViewRequestItem;
