"use client";
import { useRef } from "react";
import Icon from "./Icon";

interface FileInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: Boolean;
}

export default function FileInput({ onChange, required }: FileInputProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="shadow-custom relative flex justify-center items-center w-[110px] h-[110px] cursor-pointer rounded-full">
      <input
        type="file"
        name="file"
        onChange={onChange}
        required
        ref={fileInputRef}
        className="absolute opacity-0 w-full h-full cursor-pointer z-[9999]"
        accept=".mp3, .wav, .flac"
      />
      <Icon
        name="Upload"
        size={64}
        color="#050505"
        onClick={handleIconClick}
        style={{
          transition: "color 0.3s",
          filter: "drop-shadow(0px 0px 3px #93d7dc)",
        }}
      />
    </div>
  );
}
