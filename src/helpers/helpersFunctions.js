// import React from 'react';
import fields from '../data/formFields';
import { v4 as uuid } from 'uuid';

export const convertArrToObj = (arr) => Object.assign({}, ...arr);

export const createStateData = () =>
    fields.map((field) => {
        const { name, defaultValue } = field;
        return {
            [name]: defaultValue,
        };
    });

export const createInitStateObj = () => convertArrToObj(createStateData());

export const setColumnClassName = (isDivided) =>
    isDivided ? 'column__container column__container--2col' : 'column__container column__container--1col';

export const getCurrentDate = () => {
    const timezoneOffset = new Date().getTimezoneOffset() * 60000;
    return new Date(Date.now() - timezoneOffset).toISOString().slice(0, 10);
};

export const createNewTask = ({ taskName, owner, email, date, description }) => ({
    id: uuid(),
    taskName,
    owner,
    email,
    date,
    description,
    isDoing: true,
    idColumn: 1,
});

export const sortTasksByDate = (taskData) =>
    taskData.sort((a, b) => {
        if (!a.date && !b.date) {
            return 0;
        }
        if (!a.date) {
            return 1;
        }
        if (!b.date) {
            return -1;
        }
        return a.date < b.date ? -1 : 1;
    });

export const getColumnTasksList = (tasks, id) => {
    if (tasks.length > 0) {
        return tasks.filter((task) => task.idColumn === id);
    } else {
        return [];
    }
};

export const createFilteredTasksList = (is2ColLayout, isDoing, tasks, id) => {
    if (is2ColLayout && isDoing) {
        return getColumnTasksList(tasks, id).filter((task) => task.isDoing);
    }
    if (is2ColLayout && !isDoing) {
        return getColumnTasksList(tasks, id).filter((task) => !task.isDoing);
    }
    return getColumnTasksList(tasks, id);
};

export const setDateFormat = (date) => date.split('-').reverse().join('.');

export const setDeadlineClassName = (deadlineDate, idColumn, columns) => {
    const importantDeadline = 2;
    const currTime = new Date(getCurrentDate()).getTime();
    const deadlineTime = new Date(deadlineDate).getTime();
    const daysDifference = (deadlineTime - currTime) / (24 * 60 * 60 * 1000);
    return daysDifference <= importantDeadline && idColumn !== columns.length
        ? 'item__deadline item__deadline--important'
        : 'item__deadline';
};

export const getColumnTasksQuantity = (tasks, id) => getColumnTasksList(tasks, id).length;

export const isNavBtnDisabled = (direction, columns, columnId) =>
    (direction === 'prev' && columnId === 1) || (direction === 'next' && columnId === columns.length);

export const getColumnById = (columnId, columns) => columns.filter((col) => col.id === columnId);

export const isColumnDivided = (column) => column.isDivided;