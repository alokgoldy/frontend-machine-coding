import { useState } from 'react';

export const useForm = ()=> {
    const [values, setValues] = useState({
        name: '',
        email: '',
        message: ''
    })
    const [errors, setErrors] = useState({});

    const validate = (fieldValues = values) => {
        const temp = {...errors};

        if('name' in fieldValues){
            temp.name = 
            fieldValues.name.length < 3 ? 'Min 3 characters required' : '';
        }

        if('email' in fieldValues){
            temp.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fieldValues.email) ?
            '' : 'Invalid Email';
        }

        if('message' in fieldValues){
            temp.message = fieldValues.message.length < 10 ? 
            'Minimum 10 characters required' : '';
        }

        setErrors(temp);

        return Object.values(temp).every(x => !x);
    }

    const handleChange = (e)=>{
        const {name, value} = e.target;

        const updatedValues = {
            ...values,
            [name]: value
        }
        setValues(updatedValues);
        validate(updatedValues);
    } 

    const reset = () => {
        setValues({name: '', email: '', message: ''});
        setErrors({});
    }

    return {
        values,
        handleChange,
        errors,
        validate,
        reset
    }
} 