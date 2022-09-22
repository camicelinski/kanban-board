// import React from 'react';
import fields from '../data/formFields';

export const convertArrToObj = (arr) => Object.assign({}, ...arr);

export const createStateData = () =>
    fields.map((field) => {
        const { name } = field;
        return {
            [name]: {
                value: '',
                isValid: false,
                isFill: false,
            },
        };
    });

export const createInitStateObj = () => convertArrToObj(createStateData());

export const setColumnClassName = (isDivided) =>
    isDivided ? 'column__container column__container--2col' : 'column__container column__container--1col';
