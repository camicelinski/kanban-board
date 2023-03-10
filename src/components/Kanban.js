import React, { useEffect, useReducer } from 'react';
import columns from '../data/columnsData';
import { EditContext, TasksContext } from '../context';
import { tasksReducer } from '../reducers';
import { useModal, useStorage } from '../hooks';
import { getColumnTasksQuantity, setFullColumnInfo } from '../helpers/helpersFunctions';
import Board from './Board';
import Form from './Form';
import Confirmation from './Confirmation';
import '../styles/Kanban.css';

const Kanban = () => {
    const [saveToStorage, getFromStorage] = useStorage();
    const [ModalWithContent, showModal, closeModal, setContent] = useModal();
    const [tasks, dispatch] = useReducer(tasksReducer, getFromStorage() || []);

    useEffect(() => {
        saveToStorage(tasks);
    }, [tasks]);

    const showFullColumnInfo = (name) => {
        setContent(setFullColumnInfo(name));
        showModal();
    };

    const openForm = () => {
        setContent(<Form closeModal={closeModal} />);
        showModal();
    };

    const handleTaskAdding = () => {
        const [pendingColumn] = columns;
        const { limit, id, name } = pendingColumn;
        const pendingTasksQuantity = getColumnTasksQuantity(tasks, id);
        return limit === pendingTasksQuantity ? showFullColumnInfo(name) : openForm();
    };

    const handleClear = () => {
        setContent(<Confirmation closeModal={closeModal} />);
        showModal();
    };

    return (
        <main className="app">
            <header className="app__bar bar">
                <div className="bar__container">
                    <h1 className="bar__title">
                        <span className="bar__highlight">Kanban</span> board
                    </h1>
                    <div className="bar__wrapper">
                        <button
                            className="bar__btn bar__btn--add"
                            onClick={handleTaskAdding}
                            title="create new task"
                            type="button"
                        >
                            new task
                        </button>
                        <button
                            className="bar__btn bar__btn--clear"
                            onClick={handleClear}
                            title="clear board"
                            type="button"
                            disabled={tasks.length === 0}
                        >
                            clear board
                        </button>
                    </div>
                </div>
            </header>
            <TasksContext.Provider value={tasks}>
                <EditContext.Provider value={dispatch}>
                    <Board />
                    <ModalWithContent />
                </EditContext.Provider>
            </TasksContext.Provider>
        </main>
    );
};

export default Kanban;
