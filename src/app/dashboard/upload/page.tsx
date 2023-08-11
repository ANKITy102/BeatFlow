"use client";

// You need to import our styles for the button to look right. Best to import in the root /layout.tsx but this is fine
import "@uploadthing/react/styles.css";

import { UploadButton } from "@uploadthing/react";

import { OurFileRouter } from "../../api/uploadthing/core";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function UploadButtonPage() {
  const [images, setImages] = useState<
    {
      fileUrl: string;
      fileKey: string;
    }[]
  >([]);
  const [poster, setPoster] = useState<string | null>(null);
  const title = images.length ? (
    <>
      <p>Upload Complete!</p>
      <p className="mt-2">{images.length} files</p>
    </>
  ) : null;

  const imgList = (
    <>
      {title}
      <ul>
        {images.map((image) => (
          <li key={image.fileUrl} className="mt-2">
            <Link href={image.fileUrl} target="_blank">
              {image.fileUrl}
            </Link>
            <audio
              controls
              preload="metadata"
              onLoadedMetadata={(e: any) => {
                const posterURL = e.target.getAttribute("poster");
                console.log(posterURL);
                console.log("inside psoter");
                setPoster(posterURL);
              }}
            >
              <source src={image.fileUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </li>
        ))}
      </ul>
    </>
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <UploadButton<OurFileRouter>
        endpoint="audioUploader"
        onClientUploadComplete={(res) => {
          if (res) {
            const json = JSON.stringify(res);
            // Do something with the response
            console.log(json);
          }
          //alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
      {imgList}
    </main>
  );
}
