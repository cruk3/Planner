import React from 'react'
import './App.css';

export default function Todo( {todo , toggleTodo} ) {

  function handletoDo(){
    toggleTodo(todo.id)
  }

  return (
    <div className='card-todo'>
      <label>
        <input type="checkbox" checked = {todo.complete} onChange = {handletoDo}/>
        <div className='todo-text'>
        {todo.name}
        </div>
      </label>
    </div>
  )
}
