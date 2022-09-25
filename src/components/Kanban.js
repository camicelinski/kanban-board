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

    const tasksInMemory = getFromStorage('tasks') || [];
    console.log(tasksInMemory);
    const [tasks, setTasks] = useState(tasksInMemory);
    console.log(tasks);
    // const [tasks, dispatch] = useReducer(tasksReducer, getFromStorage() || []);

    // useEffect(() => {
    //    saveToStorage(tasks);
    //    console.log(tasks)
    // }, [tasks]);

    const setNewTask = (newTask) => {
        const toDoTasks = [...tasks].filter((task) => task.idColumn === 1).length;

        if (toDoTasks < columns[0].limit) {
            const newTasks = [...tasks, newTask];
            saveToStorage(newTasks);
            setTasks(getFromStorage() || []);
        } else {
            alert(`Task limit (${columns[0].limit}) cannot be exceeded.`);
        }
    };
    console.log(tasks);

    const moveTask = (task) => {
        if (task.idColumn === 5) {
            return;
        }
        let taskList = [...tasks];
        const nextCol = task.idColumn + 1;
        const taskQty = taskList.filter((task) => task.idColumn === nextCol).length;

        if (taskQty < columns[nextCol - 1].limit) {
            taskList.forEach((taskToMove) => {
                if (taskToMove.id === task.id) {
                    taskToMove.columnId++;
                }
            });
            saveToStorage(taskList);
            setTasks(getFromStorage() || []);
        } else {
            alert('This column is full. Task limit cannot be exceeded.');
        }
    };

    const moveBackTask = (task) => {
        if (task.columnId === 1) {
            return;
        }
        let taskList = [...tasks];
        const prevCol = task.columnId - 1;
        const taskQty = taskList.filter((task) => task.columnId === prevCol).length;

        if (taskQty < columns[prevCol - 1].limit) {
            taskList.forEach((taskToMove) => {
                if (taskToMove.id === task.id) {
                    taskToMove.columnId--;
                }
            });
            saveToStorage(taskList);
            setTasks(getFromStorage() || []);
        } else {
            alert('This column is full. Task limit cannot be exceeded.');
        }
    };

    const deleteTask = (task) => {
        if (window.confirm('Are you sure you want to delete this task?') == true) {
            const tasksList = getFromStorage();
            const updateTasks = tasksList.filter((item) => item.id !== task.id);
            saveToStorage(updateTasks);
            setTasks(getFromStorage() || []);
        } else {
            window.alert('The operation has been canceled.');
        }
    };
    console.log(tasks);

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
            <TasksContext.Provider value={{ tasks, moveTask, moveBackTask, deleteTask }}>
                <Board />
            </TasksContext.Provider>
        </main>
    );
};

export default Kanban;
