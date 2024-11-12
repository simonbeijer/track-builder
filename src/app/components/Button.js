"use client"
export default function Button({ onClick, children, className }) {
    return (
      <button
        onClick={onClick}
        className={`px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 ${className}`}
      >
        {children}
      </button>
    );
  }
  