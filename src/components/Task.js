import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ColumnsContext, TasksContext } from '../context';

const Task = function Task(props) {
    const {
        data: { id, taskName, owner, email, date, description, idColumn, isDoing },
    } = props;

    const tasks = useContext(TasksContext);
    const columns = useContext(ColumnsContext);

    return (
        <li>
            <p>Task</p>
        </li>
    );
};

Task.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.number,
        taskName: PropTypes.string,
        owner: PropTypes.string,
        email: PropTypes.string,
        date: PropTypes.string,
        description: PropTypes.string,
        idColumn: PropTypes.number,
        isDoing: PropTypes.bool,
    }),
};

export default Task;
