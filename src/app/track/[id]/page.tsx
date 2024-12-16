"use client";
import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import AudioPlayer from "@components/CustomAudioPlayer";
import Loader from "@components/Loader";
import Button from "@components/Button";
import { Track } from "../../types";

export default function TrackPage() {
  const { id } = useParams();
  const [trackData, setTrackData] = useState<Track | null>(null);
  const [audioBlobUrl, setAudioBlobUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const fetchCompleted = useRef(false);
  const [addTrack, setAddTrack] = useState(false);

  useEffect(() => {
    if (id && !fetchCompleted.current) {
      fetchCompleted.current = true;

      const fetchTrackData = async () => {
        try {
          const response = await fetch(`/api/upload?id=${id}`);
          const data = await response.json();
          console.log("Track data:", data);
          if (data) {
            setTrackData(data);
            // Fetch the audio file
            const audioResponse = await fetch(data.filePath); // Adjust to your file path
            const audioBlob = await audioResponse.blob(); // Convert to Blob
            const blobUrl = URL.createObjectURL(audioBlob); // Create a Blob URL
            setAudioBlobUrl(blobUrl); // Store the Blob URL
          } else {
            console.error("No data returned:", data);
          }
        } catch (error) {
          console.error("Error fetching track data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchTrackData();
    }
  }, [id]);

  const downloadTrack = () => {
    if (audioBlobUrl) {
      const a = document.createElement('a'); // Create an anchor element
      a.href = audioBlobUrl; // Set the Blob URL as href
      a.download = trackData?.title || 'track'; // Set default filename
      document.body.appendChild(a); // Append to body
      a.click(); // Trigger the download
      document.body.removeChild(a); // Clean up
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <h1>Track Details for ID: {id}</h1>
      {trackData ? (
        <div>
          <h2>{trackData.title}</h2>
          <p>Duration: {trackData.duration}</p>
          <p>File Path: {trackData.filePath}</p>
          <AudioPlayer trackData={{ ...trackData, blobUrl: audioBlobUrl }} />
          <Button onClick={downloadTrack} className="mt-4">
            Download Track
          </Button>
          <div>
            <button onClick={() => setAddTrack(!addTrack)}>ADD TRACK</button>
            {addTrack && (
              <span>
                <h1>ADDING TRACK</h1>
              </span>
            )}
          </div>
        </div>
      ) : (
        <p>No track found for this ID.</p>
      )}
    </div>
  );
}
