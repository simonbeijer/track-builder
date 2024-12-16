import TrackInput from "@components/TrackInput";
import Label from "@components/Label";
export default function Upload() {
  return (
    <div
      className="h-full w-full flex justify-center items-center flex-col"
      style={{ backgroundColor: "var(--color-blue)" }}
    >
      <Label text="UPLOAD YOUR TRACK"></Label>
      <TrackInput></TrackInput>
    </div>
  );
}
