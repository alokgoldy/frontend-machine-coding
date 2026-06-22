interface Props {
  label: string;
  name: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TextAreaField = ({
  label,
  name,
  value,
  error,
  onChange,
}: Props) => {
  return (
    <div className="mb-4">
      <label className="block font-semibold mb-1">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={4}
        className={`w-full border p-2 rounded ${error ? "border-red-500" : "border-gray-300"
          }`}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};