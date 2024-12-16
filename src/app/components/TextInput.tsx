"use client";
interface Input  {
  placeholder: string,
   value: any
   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
   required: boolean

}
export default function Input({ placeholder, value, onChange, required }: Input) {
  const styles = {
    input: {
      background: "var(--white)",
      border: "2px solid var(--white)",
      height: "3rem"
    },
  };

  return (
    <input
      style={styles.input}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className="p-2 rounded shadow-custom"
    />
  );
}
