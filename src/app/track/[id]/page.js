"use client";
import { useEffect, useState } from 'react';
import { useParams } from "next/navigation"; 

export default function TrackPage() {
  const { id } = useParams();
    const [trackData, setTrackData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            const fetchTrackData = async () => {
                try {
                    const response = await fetch(`/api/upload?id=${id}`);
                    const data = await response.json();
                    console.log('Track data:', data);
                    setTrackData(data);
                } catch (error) {
                    console.error('Error fetching track data:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchTrackData();
        }
    }, [id]);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h1>Track Details for ID: {id}</h1>
            {trackData ? (
                <div>
                    <h2>{trackData.title}</h2>
                    <p>Duration: {trackData.duration}</p>
                    <p>File Path: {trackData.filePath}</p>
                </div>
            ) : (
                <p>No track found for this ID.</p>
            )}
        </div>
    );
}
