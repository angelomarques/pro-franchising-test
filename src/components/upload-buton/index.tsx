import { useUploadThing } from "@/lib/uploadthing";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";

import styles from "./upload-buton.module.css";

interface Props {
  onChange: (value: string) => void;
}

export const UploadButton = ({ onChange }: Props) => {
  const [files, setFiles] = useState<File[]>([]);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    startUpload(acceptedFiles);
  }, []);

  const { startUpload, permittedFileInfo } = useUploadThing("imageUploader", {
    onClientUploadComplete: (data) => {
      onChange(data[0].url);
    },
    onUploadError: () => {
      toast.error("erro ao enviar imagem");
    },
  });

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : [];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

  return (
    <div {...getRootProps()} className={styles.container}>
      <input {...getInputProps()} />

      {files.length > 0
        ? "Imagem adicionada !"
        : "Clique para adicionar a imagem"}
    </div>
  );
};
