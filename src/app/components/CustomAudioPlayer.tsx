"use client";
import React, { useState, useRef } from "react";
import Icon from "./Icon";
import { Track } from "../types";

export default function CustomAudioPlayer({ trackData }: { trackData: Track }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

 
  const togglePlay = () => {
    const audioElement = audioRef.current;
    if (audioElement) {
      setIsPlaying((prev) => {
        if (prev) {
          audioElement.pause();
        } else {
          audioElement.play();
        }
        return !prev;
      });
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const seekTime = parseFloat(e.target.value);
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const volume = parseFloat(e.target.value);
      audioRef.current.volume = volume;
      setVolume(volume);
    }
  };

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg w-full max-w-lg mx-auto">
      <audio
        ref={audioRef}
        src={trackData.filePath}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        className="hidden"
        onEnded={() => setIsPlaying(false)}
      ></audio>
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={togglePlay}
          className="flex justify-center items-center w-16 h-16 bg-blue-500 hover:bg-blue-600 rounded-full shadow-lg transform hover:scale-110 transition-transform"
        >
          <Icon name={isPlaying ? "Pause" : "Play"} size={24} color="white" />
        </button>
        <span className="text-sm font-mono">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>
      <input
        type="range"
        min="0"
        max={duration}
        value={currentTime}
        onChange={handleSeek}
        className="w-full h-2 bg-gray-600 rounded-lg appearance-none focus:outline-none focus:ring focus:ring-blue-500"
      />
      <div className="mt-4 flex items-center">
        <label htmlFor="volume" className="mr-2 text-sm">
          Volume:
        </label>
        <input
          id="volume"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-full h-2 bg-gray-600 rounded-lg appearance-none focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>
    </div>
  );
}

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
};
