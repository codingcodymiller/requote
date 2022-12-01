import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Tesseract, { RecognizeResult } from 'tesseract.js'

type DropZoneProps = {
  updateQuote: (quote: string) => void;
}

export default function DropZone({ updateQuote}: DropZoneProps) {
  const [imagePath, setImage] = useState('');
  const onDrop = useCallback((files: Blob[]) => {
    console.log(files)
    const imageUrl = URL.createObjectURL(files[0]);
    setImage(imageUrl)
    Tesseract.recognize(
      imageUrl, 'eng',
      {
        logger: m => console.log(m)
      }
    )
    .then((image) => {
      const { text } = image.data
      updateQuote(text);
    })
    .catch(err => {
      console.error(err);
    })
  }, [])
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    imagePath
      ? <img className="rounded w-100 bg-shadow mt-4 mb-2" src={imagePath} alt="Image Preview" />
    : <div {...getRootProps({ className: "dropzone bg-shadow mt-4 mb-2 p-3" })}>
        <input className="input-zone" {...getInputProps()} />
        <div className="dropzone-body text-center h-100 w-100">
          <div>
            <p className="m-1 text-aqua-blue">
              <i className="fa-solid fa-image fa-2xl"></i>
            </p>
            <p className="m-1 text-light-grey">
              Drag and drop an image containing text here
            </p>
            <p className="m-1 text-light-grey">
              or click to select files
            </p>
          </div>
        </div>
      </div>
  );
}