import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { TasksContext } from '../context';
import Task from './Task';
import { setColumnClassName, createFilteredTasksList, getColumnTasksQuantity } from '../helpers/helpersFunctions';
import './styles/Column.css';

const Column = (props) => {
    const {
        data: { id, name, limit, isDivided },
    } = props;

    const tasks = useContext(TasksContext);
    console.log(tasks);
    // const tasks = [];

    const renderNoTasks = () => (
        <div className="column__placeholder">
            <p className="column__msg">no tasks</p>
        </div>
    );

    const renderTasks = (is2ColLayout, isDoing = false) => {
        const tasksList = createFilteredTasksList(is2ColLayout, isDoing, tasks, id);
        console.log(tasksList);
        return tasksList.map((task) => <Task data={task} key={task.id} />);
    };

    const renderLayoutWith1Col = () => (
        <div className="column__1col">
            <span className="column__subheader"></span>
            <ul className="column__list column__list--1col">{renderTasks(isDivided)}</ul>
        </div>
    );

    const renderLayoutWith2Col = () => (
        <>
            <div className="column__2col">
                <span className="column__subheader">doing</span>
                <ul className="column__list column__list--doing">{renderTasks(isDivided, true)}</ul>
            </div>
            <div className="column__2col">
                <span className="column__subheader">done</span>
                <ul className="column__list column__list--done">{renderTasks(isDivided)}</ul>
            </div>
        </>
    );

    const renderColumn = () => (
        <div className={setColumnClassName(isDivided)}>
            {isDivided ? renderLayoutWith2Col() : renderLayoutWith1Col()}
        </div>
    );

    return (
        <li className="board__column column">
            <header className={`column__header column__header--${name}`}>
                <div className="column__wrapper">
                    <h2 className="column__title">{name}</h2>
                    <p className="column__wip-limit">
                        {getColumnTasksQuantity(tasks, id)}/{limit}
                    </p>
                </div>
                <div>Fontawsome</div>
            </header>
            {tasks.length === 0 ? renderNoTasks() : renderColumn()}
        </li>
    );
};

Column.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        limit: PropTypes.number,
        isDivided: PropTypes.bool,
    }),
};

export default Column;
