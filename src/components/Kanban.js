import React from 'react';
import { TasksContext } from '../context';
import Board from './Board';

const Kanban = function Kanban() {
    const tasks = [];

    return (
        <main>
            <header>
                <h1>kanban board</h1>
                <div>
                    <button>add task</button>
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
