import React from 'react';
import PropTypes from 'prop-types';
// import { TasksContext } from '../context';
// import Task from './Task';

const Column = (props) => {
    const {
        data: { name, limit, isDivided },
    } = props;

    // const tasks = useContext(TasksContext);
    const tasks = [];

    const renderNoTasks = () => (
        <div>
            <p>no tasks</p>
        </div>
    );

    const renderTasks = () => {};

    const renderLayoutWith1Col = () => (
        <div>
            <span></span>
            <ul>{renderTasks(isDivided)}</ul>
        </div>
    );

    const renderLayoutWith2Col = () => (
        <>
            <div>
                <span>doing</span>
                <ul>{renderTasks(isDivided, true)}</ul>
            </div>
            <div>
                <span>done</span>
                <ul>{renderTasks(isDivided)}</ul>
            </div>
        </>
    );

    const renderColumn = () => {
        <div>{isDivided ? renderLayoutWith2Col() : renderLayoutWith1Col()}</div>;
    };

    return (
        <li>
            <header>
                <div>
                    <h2>{name}</h2>
                    <p>tasks/{limit}</p>
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
