import TrackInput from "@components/TrackInput.js";
export default function Home() {
  return (
    <div
      className="h-48 w-full flex justify-center items-center"
      style={{ backgroundColor: "var(--color-blue)" }}
    >
      <TrackInput label="UPLOAD YOUR TRACK"></TrackInput>
    </div>
  );
}
