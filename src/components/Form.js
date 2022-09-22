import React, { useReducer, useState } from 'react';
import FormField from './FormField';
import fields from '../data/formFields';
// import { formReducer } from '../reducers';
// import { createInitStateObj } from '../helpers/helpersFunctions';
import validateForm from '../helpers/validateForm';

const Form = () => {
    const init = {};
    fields.forEach(({ name, defaultValue }) => {
        init[name] = defaultValue;
    });

    const reducer = (state, { key, value }) => {
        return { ...state, [key]: value };
    };

    const [state, dispatch] = useReducer(reducer, init);
    // const [state, dispatch] = useReducer(formReducer, createInitStateObj());
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        setErrors(validateForm(fields, state));
    };

    const renderFormFields = () =>
        fields.map((field) => (
            <FormField key={field.name} field={field} formState={state} dispatch={dispatch} errors={errors} />
        ));

    return (
        <>
            <form onSubmit={handleSubmit} noValidate>
                {renderFormFields()}
                <input type="submit" value="add new task" />
            </form>
            <span>* required field</span>
        </>
    );
};

export default Form;
