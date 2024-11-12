"use client";
export default function Input({ placeholder, value, onChange, required }) {
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
