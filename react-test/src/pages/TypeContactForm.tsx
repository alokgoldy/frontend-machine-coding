import { useState } from "react";
import { useForm, FormData } from "../hooks/ts/useForm";
import { InputField } from '../components/type-contact-form/InputField'
import { TextAreaField } from '../components/type-contact-form/TextAreaField'

export default function App() {
  const { values, errors, handleChange, validate, reset } = useForm();

  const [submissions, setSubmissions] = useState<FormData[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    setSuccess("");

    new Promise((res) => setTimeout(res, 1000));

    setSubmissions((prev) => [values, ...prev]);
    setLoading(false);
    setSuccess("Form submitted successfully!");
    reset();
  }
  const isFormValid =
    values.name &&
    values.email &&
    values.message &&
    Object.values(errors).every((x) => !x);
    
  return (
    <div className="max-w-xl mx-auto mt-10 p-6 shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Contact Form</h1>

      <form onSubmit={handleSubmit}>
        <InputField
          label="Name"
          name="name"
          value={values.name}
          error={errors.name}
          onChange={handleChange}
        />

        <InputField
          label="Email"
          name="email"
          value={values.email}
          error={errors.email}
          onChange={handleChange}
        />
        <TextAreaField
          label="Message"
          name="message"
          value={values.message}
          error={errors.message}
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={!isFormValid || loading}
          className="w-full bg-blue-500 text-white py-2 rounded disabled:bg-gray-400"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}