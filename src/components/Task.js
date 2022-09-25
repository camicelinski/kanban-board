import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ColumnsContext, TasksContext } from '../context';
import { setDateFormat, setDeadlineClassName, isNavBtnDisabled } from '../helpers/helpersFunctions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong, faArrowRightLong, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './styles/Task.css';

const Task = function Task(props) {
    const {
        data: { taskName, owner, email, date, description, idColumn },
    } = props;
    const { moveTask, moveBackTask, deleteTask } = useContext(TasksContext);

    // const tasks = useContext(TasksContext);
    const columns = useContext(ColumnsContext);
    // const moveTask = useContext(EditTasksContext);

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
                        onClick={() => moveBackTask(props.data)}
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
                        onClick={() => moveTask(props.data)}
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

21189087;
