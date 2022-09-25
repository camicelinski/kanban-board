import React, { useState } from 'react';
import { TasksContext } from '../context';
// import { tasksReducer } from '../reducers';
import { useStorage } from '../hooks';
// import { createNewTask } from '../helpers/helpersFunctions';
import columnsData from '../data/columnsData';
import Board from './Board';
import Form from './Form';

const Kanban = function Kanban() {
    const columns = columnsData;

    const [saveToStorage, getFromStorage] = useStorage();
    const [tasks, setTasks] = useState(getFromStorage('tasks') || []);
    // const [tasks, dispatch] = useReducer(tasksReducer, getFromStorage() || []);

    // useEffect(() => {
    //    saveToStorage(tasks);
    //    console.log(tasks)
    // }, [tasks]);

    const setNewTask = (newTask) => {
        const toDoTasks = [...tasks].filter((task) => task.idColumn === 1).length;

        if (toDoTasks < columns[0].limit) {
            saveToStorage(tasks, newTask);
            setTasks(getFromStorage() || []);
        } else {
            alert(`Task's limit (${columns[0].limit}) cannot be exceeded.`);
        }
    };

    return (
        <main>
            <header>
                <h1>kanban board</h1>
                <div>
                    <button>add task</button>
                    <Form setNewTask={setNewTask} />
                    <button>clear board</button>
                </div>
            </header>
            <TasksContext.Provider value={tasks}>
                <Board />
            </TasksContext.Provider>
        </main>
    );
};

export default Kanban;
