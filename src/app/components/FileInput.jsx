"use client";

export default function FileInput() {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file.name);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <label className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer">
        Upload File
        <input
          type="file"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
    </div>
  );
}
