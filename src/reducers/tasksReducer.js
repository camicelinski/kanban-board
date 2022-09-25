import { sortTasksByDate, createNewTask } from '../helpers/helpersFunctions';

const tasksReducer = (tasks, action) => {
    const { type } = action;
    switch (type) {
        case 'add-task': {
            const tasksData = [...tasks, createNewTask(action.payload.newTask)];
            return sortTasksByDate(tasksData);
        }
        /*case TASKS_ACTIONS.MOVE: {
            const {
                payload: { id, ...rest },
            } = action;
            return tasks.map((task) => (task.id === id ? { ...task, ...rest } : task));
        }
        case TASKS_ACTIONS.REMOVE: {
            const { payload } = action;
            return tasks.filter((task) => task.id !== payload);
        }
        case TASKS_ACTIONS.CLEAR_BOARD:
            return [];*/
        default:
            return tasks;
    }
};

export default tasksReducer;
