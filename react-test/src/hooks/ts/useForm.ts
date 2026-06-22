import { useState } from 'react';

export interface FormData {
  name: string,
  email: string,
  message: string
}

export interface Errors {
  name?: string,
  email?: string,
  message?: string
}

export const useForm = () => {
  const [values, setValues] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState<Errors>({});

  const validate = (fieldValues = values) => {
    let temp: Errors = { ...errors };

    if ('name' in fieldValues) {
      temp.name = fieldValues.name.length > 3 ? '' : "Minimum 3 characters in name";
    }

    if ('email' in fieldValues) {
      temp.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fieldValues.email) ? '' : "Invalid Email";
    }

    if ('message' in fieldValues) {
      temp.message = fieldValues.message.length > 10 ? '' : "Minimum 10 characters required"
    }

    setErrors(temp);

    return Object.values(temp).every(x => x === '');
  }

  const handleChange =
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;

      setValues({
        ...values,
        [name]: value
      });

      validate({ ...values, [name]: value });
    }

  const reset = () => {
    setValues({ name: '', email: '', message: '' });
    setErrors({});
  }

  return {
    errors,
    values,
    handleChange,
    reset,
    validate
  }
}