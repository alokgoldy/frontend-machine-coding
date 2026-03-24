export const InputField = ({ label, name, value, error, onChange }) => {
    return (
        <div className="mb-4">
            <label className="block font-semibold mb-1">{label}</label>
            <input
                name={name}
                value={value}
                onChange={onChange}
                className={`w-full border p-2 rounded ${error ? "border-red-500" : "border-gray-300"
                    }`}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    )
}