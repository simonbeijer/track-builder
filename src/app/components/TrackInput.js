"use client";
import { useState } from "react";
import Button from "@components/Button";
import TextInput from "@components/TextInput";
import FileInput from "@components/FileInput";
import Label from "@components/Label";
import Share from "@components/Share";

export default function FileUploadForm(props) {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState(0);
  const [shareData, setShareData] = useState(null);

  const handleFileChange = (e) => {
    console.log("file input pressed")
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("duration", duration);

    console.log("FORMDATA => ", formData)

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const track = await response.json();
      console.log("Track added:", track);
      setShareData(track)
    } else {
      console.error("Error adding track");
    }
  };
  const styles = {
    form: {
    },
  };
  return (
    <form onSubmit={handleSubmit} style={styles.form} className="flex flex-col items-center w-6/12">
        <Label text={props.label}></Label>
      <div className="flex flex-row space-around justify-between p-4rounded w-full items-center">
        <FileInput onChange={handleFileChange} required />
        <TextInput
          placeholder="Track Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      <Button type="submit">Upload track</Button>
      {shareData && <Share data={shareData} />}
      </div>
    </form>
  );
}
