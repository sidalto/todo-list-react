/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { FaEdit, FaWindowClose } from 'react-icons/fa';

import './Tarefas.css';

function Tarefas({ tarefas, handleEdit, handleDelete }) {
  return (
    <ul className="tarefas">
      {tarefas.map((tarefa, indice) => (
        <li key={tarefas.indexOf(tarefa)}>
          {tarefa}
          <span>
            <FaEdit onClick={(evento) => handleEdit(evento, indice)} className="edit" />
            <FaWindowClose onClick={(evento) => handleDelete(evento, indice)} className="delete" />
          </span>
        </li>
      ))}
    </ul>
  );
}

Tarefas.propTypes = {
  tarefas: PropTypes.array.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default Tarefas;
