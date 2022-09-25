import React, { useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import FormField from './FormField';
import fields from '../data/formFields';
import validateForm from '../helpers/validateForm';
import { convertArrToObj, createInitStateObj, createNewTask } from '../helpers/helpersFunctions';
import { formReducer } from '../reducers';
// import { EditTasksContext } from '../context';

const Form = (props) => {
    /*const init = {};
    const setInitFields = () => {
        fields.forEach(({ name, defaultValue }) => {
            init[name] = defaultValue;
        });
    };
    setInitFields();*/

    // const editTasks = useContext(EditTasksContext); // dispatch tasksReducer
    const [state, dispatch] = useReducer(formReducer, createInitStateObj());
    const [errors, setErrors] = useState([]);

    const { setNewTask } = props;
    // const reducer = (state, { key, value }) => {
    //    return { ...state, [key]: value };
    //};

    /*const reducer = (state, action) => {
        switch (action.type) {
            case 'reset':
                return setInitFields();
            case 'change': {
                const {
                    payload: { name, value },
                } = action;
                return { ...state, [name]: value };
            }
            default:
                return state;
        }
    };*/

    const handleSubmit = (e) => {
        e.preventDefault();

        setErrors(validateForm(fields, state));
        console.log(errors);
        if (errors.length === 0) {
            console.log('state:', state);
            addNewTask();
            // dispatch({ type: 'reset' });
        }
    };

    const addNewTask = () => {
        console.log('state:', state);
        const newTaskArr = fields.map((field) => {
            const { name } = field;
            const value = state[name];
            if (value.length !== 0) {
                return {
                    [name]: value,
                };
            }
            return null;
        });
        const newTask = createNewTask(convertArrToObj(newTaskArr));
        console.log('newTask:', newTask);
        setNewTask(newTask);
        dispatch({ type: 'reset' });
        // editTasks({
        //    type: 'add-task',
        //    payload: { newTask },
        //});
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

Form.propTypes = {
    setNewTask: PropTypes.func,
};

export default Form;
