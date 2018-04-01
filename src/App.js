import React, { Component } from 'react';
import axios from 'axios';
import uuid from 'uuid';
import Projects from "./Components/Projects";
import AddProject from "./Components/AddProject";
import Todos from "./Components/Todos";

import './App.css';

class App extends Component {

  constructor() {
    super()
    this.state = {
      projects: []
    }
  }

  getTodos() {
    axios({
      url: 'http://jsonplaceholder.typicode.com/todos',
      responseType: 'json'
    })
      .then(function (response) {
        this.setState({ todos: response.data }, function () {
          console.log("this.state ", this.state);
        })
      }.bind(this))
      .catch(function (error) {
        console.log("error ", error);
      });
  }

  getProjects() {
    this.setState({
      projects: [
        {
          id: uuid.v4(),
          title: 'Business Website',
          category: 'Web Design'
        },
        {
          id: uuid.v4(),
          title: 'Social App',
          category: 'Mobile Development'
        },
        {
          id: uuid.v4(),
          title: 'Ecomerce Shopping Cart',
          category: 'Web Development'
        }
      ]
    })
  }

  componentWillMount() {
    this.getProjects()
    this.getTodos()
  }

  componentDidMount() {
    this.getTodos()
  }

  handleAddProject(project) {
    let projects = this.state.projects;
    projects.push(project)
    this.setState({ projects: projects })
  }

  handleDeleteProject(id) {
    let projects = this.state.projects;
    let index = projects.findIndex(x => x.id === id);
    projects.splice(index, 1);
    this.setState({ projects: projects })
  }

  handleDeleteTodo(id) {
    let todos = this.state.todos;
    let index = todos.findIndex(x => x.id === id);
    todos.splice(index, 1);
    this.setState({ todos: todos })
  }

  render() {
    return (
      <div className="App">
        <AddProject addProject={this.handleAddProject.bind(this)} />
        <Projects projects={this.state.projects} onDelete={this.handleDeleteProject.bind(this)} />
        <hr/>
        <Todos todos={this.state.todos} onDelete={this.handleDeleteTodo.bind(this)} />
      </div>
    );
  }
}

export default App;
