import { useState } from 'react';
import { useForm } from '../hooks/useForm';
import { InputField } from '../components/contact-form/InputField';
import { TextAreaField } from '../components/contact-form/TextAreaField';


function ContactForm() {
  const { values, errors, reset, validate, handleChange } = useForm();

  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    setSuccess('');

    await new Promise((res) => setTimeout(res, 1000));

    setSubmissions((prev) => [values, ...prev]);
    setLoading(false);
    setSuccess("Form submitted successfully!");
    reset();
  }

  const isFormValid =
    values.email &&
    values.name &&
    values.message &&
    Object.values(errors).every((x) => !x);

  return (
    <div className='max-w-xl mx-auto mt-10 p-6 shadow-lg rounded-lg'>
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
          type='submit'
          disabled={!isFormValid || loading}
          className="w-full bg-blue-500 text-white py-2 rounded disabled:bg-gray-400"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
      {success && (
        <p className="text-green-600 mt-4 font-semibold">{success}</p>
      )}

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Submissions</h2>

        {submissions.length === 0 && <p>No submissions yet</p>}

        {submissions.map((item, index) => (
          <div
            key={index}
            className="border p-3 mb-2 rounded bg-gray-50"
          >
            <p><strong>Name:</strong> {item.name}</p>
            <p><strong>Email:</strong> {item.email}</p>
            <p><strong>Message:</strong> {item.message}</p>
          </div>
        ))}
      </div>
    </div>
  )

}

export default ContactForm;