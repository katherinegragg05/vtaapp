import { useState } from "react";
import AWS from "aws-sdk";
import FileDropzone from "../global/FileDropzone";
import DownloadOR from "./DownloadOR";

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

function PendingPayment({ docIId }) {
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
  return (
    <div className="flex flex-col space-y-4">
      <DownloadOR />
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="role">
          Upload Receipt<span className="text-rose-500">*</span>
        </label>
        <FileDropzone setFile={handleFileInput} />
      </div>
    </div>
  );
}

export default PendingPayment;
