import React, { Component } from 'react';
import Form from './Form';
import Tarefas from './Tarefas';

import './Main.css';

class Main extends Component {
  state = {
    novaTarefa: '',
    tarefas: [],
    indice: -1,
  };

  componentDidMount() {
    const tarefas = JSON.parse(localStorage.getItem('tarefas'));
    if (!tarefas) {
      return;
    }
    this.setState({
      tarefas,
    });
  }

  componentDidUpdate(prevProps, prevSate) {
    const { tarefas } = this.state;
    if (tarefas === prevSate.tarefas) {
      return;
    }
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }

  handleChange = (evento) => {
    this.setState({
      novaTarefa: evento.target.value,
    });
  }

  handleEdit = (evento, indice) => {
    const { tarefas } = this.state;
    this.setState({
      indice,
      novaTarefa: tarefas[indice],
    });
  }

  handleDelete = (evento, indice) => {
    const { tarefas } = this.state;
    const novasTarefas = [...tarefas];
    novasTarefas.splice(indice, 1);
    this.setState({
      tarefas: [...novasTarefas],
    });
  }

  handleSubmit = (evento) => {
    evento.preventDefault();
    const { tarefas, indice } = this.state;
    let { novaTarefa } = this.state;
    novaTarefa = novaTarefa.trim();
    if (tarefas.indexOf(novaTarefa) !== -1) {
      return;
    }
    const novasTarefas = [...tarefas];
    if (indice === -1) {
      this.setState({
        tarefas: [...novasTarefas, novaTarefa],
        novaTarefa: '',
      });
    } else {
      novasTarefas[indice] = novaTarefa;
      this.setState({
        tarefas: [...novasTarefas],
        indice: -1,
      });
    }
  }

  render() {
    const { novaTarefa, tarefas } = this.state;
    return (
      <div className="main">
        <h1>Lista de tarefas</h1>

        <Form
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          novaTarefa={novaTarefa}
        />

        <Tarefas
          tarefas={tarefas}
          handleEdit={this.handleEdit}
          handleDelete={this.handleDelete}
        />

      </div>
    );
  }
}

export default Main;
