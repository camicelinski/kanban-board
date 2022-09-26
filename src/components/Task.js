import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ColumnsContext, TasksContext } from '../context';
import {
    setDateFormat,
    setDeadlineClassName,
    isNavBtnDisabled,
    getColumnById,
    isColumnDivided,
} from '../helpers/helpersFunctions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong, faArrowRightLong, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './styles/Task.css';

const Task = function Task(props) {
    const {
        data: { id, taskName, owner, email, date, description, idColumn, isDoing },
    } = props;
    const { tasks, moveTask, moveBackTask, moveTaskInsideColumn, deleteTask } = useContext(TasksContext);
    console.log(tasks);
    const columns = useContext(ColumnsContext);
    // const moveTask = useContext(EditTasksContext);

    const handleTaskMove = (direction) => {
        const [currentColumn] = getColumnById(idColumn, columns);
        const isCurrentColumnDivided = isColumnDivided(currentColumn);
        return isCurrentColumnDivided && ((direction === 'next' && isDoing) || (direction === 'prev' && !isDoing))
            ? moveTaskInsideColumn(id, isDoing)
            : moveTaskOutsideColumn(direction);
    };

    // const moveInsideColumn = () => moveTask({ type: TASKS_ACTIONS.MOVE, payload: { id, isDoing: !isDoing } });

    const moveTaskOutsideColumn = (direction) => {
        if (direction === 'next') {
            moveTask(props.data);
        }
        if (direction === 'prev') {
            const [prevColumn] = getColumnById(idColumn - 1, columns);
            const isPrevColumnDivided = isColumnDivided(prevColumn);
            moveBackTask(props.data, isPrevColumnDivided);
        }
    };

    const renderTaskInfo = () => (
        <>
            <header className="item__header">
                <h3 className="item__name">{taskName}</h3>
                {renderDeadline()}
            </header>
            <div className="item__detail">
                <p className="item__info">
                    <span className="item__label">
                        <i className="fas fa-user-ninja item__icon" />
                    </span>
                    <span className="item__description">{owner}</span>
                </p>
                <p className="item__info">
                    <span className="item__label">
                        <i className="fas fa-at item__icon" />
                    </span>
                    <span className="item__description">
                        <a className="item__link" href={`mailto:${email}`}>
                            {email}
                        </a>
                    </span>
                </p>
                {renderDescription()}
            </div>
        </>
    );

    const renderDeadline = () => {
        if (date) {
            return (
                <p className={setDeadlineClassName(date, idColumn, columns)}>
                    <i className="fas fa-hourglass-end item__icon item__icon--deadline" />
                    {setDateFormat(date)}
                </p>
            );
        }
        return null;
    };

    const renderDescription = () => {
        if (description) {
            return (
                <p className="item__info">
                    <span className="item__label">
                        <i className="fas fa-info item__icon" />
                    </span>
                    <span className="item__description">{description}</span>
                </p>
            );
        }
        return null;
    };

    return (
        <li className="column__item item">
            <span className="item__pin" />
            <article className="item__task">
                {renderTaskInfo()}
                <footer className="item__footer">
                    <button
                        className="item__btn item__btn--prev"
                        onClick={() => handleTaskMove('prev')}
                        // onClick={() => moveBackTask(props.data)}
                        type="button"
                        title="move to previous section"
                        disabled={isNavBtnDisabled('prev', columns, idColumn)}
                    >
                        {<FontAwesomeIcon icon={faArrowLeftLong} />}
                    </button>
                    <button
                        className="item__btn item__btn--remove"
                        onClick={() => deleteTask(props.data)}
                        type="button"
                        title="remove task"
                    >
                        {<FontAwesomeIcon icon={faTrashAlt} />}
                    </button>
                    <button
                        className="item__btn item__btn--next"
                        onClick={() => handleTaskMove('next')}
                        // onClick={() => moveTask(props.data)}
                        type="button"
                        title="move to next section"
                        disabled={isNavBtnDisabled('next', columns, idColumn)}
                    >
                        {<FontAwesomeIcon icon={faArrowRightLong} />}
                    </button>
                </footer>
            </article>
        </li>
    );
};

Task.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.string,
        taskName: PropTypes.string,
        owner: PropTypes.string,
        email: PropTypes.string,
        date: PropTypes.string,
        description: PropTypes.string,
        idColumn: PropTypes.number,
        isDoing: PropTypes.bool,
    }),
    moveTask: PropTypes.func,
    moveBackTask: PropTypes.func,
    deleteTask: PropTypes.func,
};

export default Task;