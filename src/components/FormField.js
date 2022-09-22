import React from 'react';
import PropTypes from 'prop-types';

const FormField = (props) => {
    const handleChange = (e) => {
        const { dispatch, field } = props;
        // const { name, value } = e.target;
        dispatch({
            key: field.name,
            value: e.target.value,
            // type: 'change-value',
            // payload: { name, value },
        });
    };

    const renderField = () => {
        const {
            field: { name, label, type = null, fieldName = 'input' },
            formState,
            errors,
        } = props;
        const FieldName = fieldName;

        return (
            <>
                <label htmlFor={name}>{label}</label>
                <FieldName
                    id={name}
                    name={name}
                    type={type}
                    value={formState[name].value}
                    onChange={handleChange}
                    autoComplete="off"
                />
                {errors.map((error) => {
                    return error && error.field.name === name ? (
                        <p key={`${error.field.name}: ${error.text}`} style={{ color: 'red' }}>
                            {error.text}
                        </p>
                    ) : null;
                })}
            </>
        );
    };

    return <div>{renderField()}</div>;
};

FormField.propTypes = {
    dispatch: PropTypes.func,
    field: PropTypes.shape({
        name: PropTypes.string,
        label: PropTypes.string,
        type: PropTypes.string,
        fieldName: PropTypes.string,
    }),
    formState: PropTypes.object,
    errors: PropTypes.arrayOf(PropTypes.object),
};

export default FormField;
