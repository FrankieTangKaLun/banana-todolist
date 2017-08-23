import React, { Component } from 'react';
import 'normalize.css'
import './reset.css'
import './App.css';
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import UserDialog from './UserDialog'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      newTodo: '',
      todoList: []
    }
  }

  render() {

    let todos = this.state.todoList
      .filter((item)=> !item.deleted)
      .map((item,index)=>{
      return (
        <li key={index}>
          <TodoItem todo={item} 
          onToggle={this.toggle.bind(this)} 
          onDelete={this.delete.bind(this)} />
        </li>
      )
    })
    console.log(todos)

    return (
      <div className="App">
        <h1>我的待办</h1>
        <div className='inputWapper'>
          <TodoInput content={this.state.newTodo} 
          onSubmit={this.addTodo.bind(this)} 
          onChange={this.changeTitle.bind(this)}/>
        </div>
        <ol className="todoList">
          {todos}
        </ol>
        <UserDialog />
      </div>
    )
  }
  componentDidUpdate(){
    
  }
  toggle(e,todo){
    todo.status = todo.status ==='completed' ? '' : 'completed'
    this.setState(this.state)
  }
  changeTitle(e){
    this.setState({
      newTodo: e.target.value,
      todoList: this.state.todoList
    })
  }
  addTodo(e){
    this.state.todoList.push({
      id: idMaker(),
      title: e.target.value,
      status: null,
      deleted: false
    })
    this.setState({
      newTodo: '',
      todoList: this.state.todoList
    })
  }
  delete(e,todo){
    todo.deleted = true
    this.setState(this.state)
  }
}

export default App;

let id = 0

function idMaker(){
  id += 1
  return id
}