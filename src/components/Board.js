import React, { useContext } from 'react';
import { ColumnsContext } from '../context';
import Column from './Column';

const Board = function Board() {
    const columns = useContext(ColumnsContext);

    return (
        <section>
            <ul>
                {columns.map((column) => (
                    <Column key={column.name} data={column} />
                ))}
            </ul>
        </section>
    );
};

export default Board;
