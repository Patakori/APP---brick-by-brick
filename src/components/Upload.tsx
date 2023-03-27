/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUploadCloud } from 'react-icons/fi';
import { VscFilePdf } from 'react-icons/vsc';

interface UploadProps{
  files: any
  setFiles: any
  hiddenPreviewPhoto:any
  viewIconPdf: any
  typeUpload: any
  textError: any

}

export default function Upload({
  files,
  setFiles,
  typeUpload,
  textError,

}:UploadProps) {

  const onDrop = (acceptedFiles:any) => {
    console.log(acceptedFiles)
    acceptedFiles.forEach((file:any) => {
      const reader = new FileReader()
      reader.onload = () => {
        // Do whatever you want with the file contents
        const fileContent: any = reader.result;
        const jsonData = JSON.parse(fileContent);
        console.log(jsonData);
      };
      reader.readAsText(file);
    })
    
  }

  const {
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragReject,
    isDragActive,
    isFocused,
  } = useDropzone({
    accept:typeUpload,
    onDrop
  });

  return (
    <section className="container">
      <div
        {...getRootProps({ isFocused, isDragAccept, isDragReject })}
        className={`flex flex-col w-[24.5rem] h-[7.688rem] border-dashed
        rounded-[.5rem] border-[2px] bg-white items-center justify-center gap-y-[.5rem] 
        ${isDragAccept && 'border-[#00e676]'}
        ${isDragReject && 'border-[#ff1744]'}
        ${isFocused && 'border-[#2196f3]'}
        `}
      >
        <input {...getInputProps()} />

        {
          
            
              <>
                {isDragAccept && (
                  (
                  <>
                    <FiUploadCloud className="text-[#808080] text-[2rem] stroke-1" />
                    <p className=" font-museoModerno text-sm font-normal text-[#808080]
                        text-center max-w-[8.938rem]"
                    >
                      Solte o arquivo

                    </p>
                  </>
                  )
                )}
                {isDragReject && (
                  (
                  <>
                    <FiUploadCloud className="text-[#808080] text-[2rem] stroke-1" />
                    <p className=" font-museoModerno text-sm font-normal text-[#808080]
                        text-center max-w-[8.938rem]"
                    >
                      {textError}

                    </p>
                  </>
                  )
                )}
                {!isDragActive && (
                  (
                  <>
                    <FiUploadCloud className="text-[#808080] text-[2rem] stroke-1" />
                    <p className=" font-museoModerno text-sm font-normal text-[#808080]
                        text-center max-w-[8.938rem]"
                    >
                      Fazer upload ou Solte o arquivo aqui

                    </p>
                  </>
                  )
                )}
              </>
            
        }

      </div>
    </section>
  );
}
