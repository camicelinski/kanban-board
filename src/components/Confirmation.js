/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { EditContext } from '../context';
import { TASKS_ACTIONS } from '../actions/actions';
import '../styles/Confirmation.css';

const Confirmation = (props) => {
    const { closeModal, id = null, taskName = null } = props;

    const editTasks = useContext(EditContext);

    const setParagraphContent = () =>
        id ? `Remove task ${taskName.toUpperCase()}?` : 'Clear the board?';

    const clearBoard = () => {
        editTasks({ type: TASKS_ACTIONS.CLEAR_BOARD });
        return closeModal();
    };

    const removeTask = () => {
        editTasks({ type: TASKS_ACTIONS.REMOVE, payload: id });
        return closeModal();
    };

    const handleRemove = () => (id ? removeTask() : clearBoard());

    return (
        <>
            <p className="modal__paragraph">{setParagraphContent()}</p>
            <div className="modal__actions">
                <button className="modal__confirm" onClick={handleRemove} type="button">
                    yes
                </button>
                <button className="modal__cancel" onClick={() => closeModal()} type="button">
                    no
                </button>
            </div>
        </>
    );
};

export default Confirmation;
