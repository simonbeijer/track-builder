"use client";
import { useEffect, useRef } from 'react';
import feather from 'feather-icons';

export default function FileInput({ onChange }) {
  const fileInputRef = useRef(null);

  useEffect(() => {
    feather.replace();
  }, []);

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const styles = {
    inputDiv: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '110px',
      height: '110px',
      cursor: 'pointer',
      borderRadius: '50%',
    },
    input: {
      position: 'absolute',
      opacity: 0,
      width: '100%',
      height: '100%',
      cursor: 'pointer',
      zIndex: 9999
    },
    icon: {
      color: '#050505',
      width: '64px',
      height: '64px',
      transition: 'color 0.3s',
      filter:'drop-shadow(0px 0px 3px #93d7dc)',
    },
  };

  return (
    <div style={styles.inputDiv} className="shadow-custom">
      <input 
        type="file" 
        name="file" 
        onChange={onChange} 
        required 
        ref={fileInputRef} 
        style={styles.input}
        accept=".mp3, .wav, .flac"
      />
      <i 
        data-feather="upload" 
        style={styles.icon} 
        onClick={handleIconClick}
      ></i>
    </div>
  );
}
