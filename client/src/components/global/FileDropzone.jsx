import React from "react";
import { useDropzone } from "react-dropzone";

function FileDropzone({ type }) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    maxFiles: 1,
  });

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <section className="rounded-md border-3 border-dashed border-[#56C7D2] px-5 py-5 bg-[#ebf7f8] cursor-pointer">
      <div
        {...getRootProps({
          className: "dropzone  flex flex-col items-center ",
        })}
      >
        <input {...getInputProps()} />
        <svg
          width="33"
          height="32"
          viewBox="0 0 33 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_1851_3542)">
            <path
              d="M20.5 10.6665H20.5133"
              stroke="#02B4C0"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M23.1673 5.3335H9.83398C7.62485 5.3335 5.83398 7.12436 5.83398 9.3335V22.6668C5.83398 24.876 7.62485 26.6668 9.83398 26.6668H23.1673C25.3765 26.6668 27.1673 24.876 27.1673 22.6668V9.3335C27.1673 7.12436 25.3765 5.3335 23.1673 5.3335Z"
              stroke="#02B4C0"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.83398 19.9999L11.1673 14.6666C11.7754 14.0815 12.4652 13.7734 13.1673 13.7734C13.8695 13.7734 14.5592 14.0815 15.1673 14.6666L21.834 21.3333"
              stroke="#02B4C0"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19.166 18.6664L20.4993 17.3331C21.1074 16.748 21.7972 16.4399 22.4993 16.4399C23.2015 16.4399 23.8913 16.748 24.4993 17.3331L27.166 19.9998"
              stroke="#02B4C0"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_1851_3542">
              <rect
                width="32"
                height="32"
                fill="white"
                transform="translate(0.5)"
              />
            </clipPath>
          </defs>
        </svg>
        <span>
          <span className="text-[#56C7D2]">Click to replace</span> or drag and
          drop
        </span>
        <span className="text-xs text-slate-600">PNG or JPEG files</span>
      </div>
      <aside>
        {/* <h4>Files</h4> */}
        <ul className="text-sm font-semibold text-green-900">{files}</ul>
      </aside>
    </section>
  );
}

export default FileDropzone;
