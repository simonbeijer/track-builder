"use client";

import React, { useState } from "react";
import { Button, TextInput, FileInput, Share, Card } from "@components";
import {Track} from "@types"

export default function FileUploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [duration, setDuration] = useState<number>(0);
  const [track, setTrack] = useState<Track | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    } else {
      setFile(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("duration", duration.toString());

    console.log("FORMDATA => file:", formData.get("file"));
    console.log("FORMDATA => title:", formData.get("title"));
    console.log("FORMDATA => duration:", formData.get("duration"));

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const trackData = await response.json();
        console.log("Track added:", trackData);
        setTrack(trackData);
      } else {
        console.error("Error uploading track");
      }
    } catch (error) {
      console.error("An error occurred during the upload:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center w-6/12"
    >
      <div className="flex flex-col space-around justify-between p-4 rounded w-full items-center">
        <Card>
        <FileInput onChange={handleFileChange} required={true} />
        </Card>
        <Card>
        <TextInput
          placeholder="Track Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        {/* Submit Button */}
        <Button type="submit">Upload Track</Button>
        </Card>
        {/* Display Share Component if a track is set */}
        {track && <Share track={track} />}
      </div>
    </form>
  );
}
