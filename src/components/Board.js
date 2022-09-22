import React, { useContext } from 'react';
import { ColumnsContext } from '../context';
import Column from './Column';
import './styles/Board.css';

const Board = function Board() {
    const columns = useContext(ColumnsContext);

    return (
        <section className="app__board board">
            <ul className="board__list">
                {columns.map((column) => (
                    <Column key={column.name} data={column} />
                ))}
            </ul>
        </section>
    );
};

export default Board;
