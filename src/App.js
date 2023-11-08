import React, {useState, useRef, useEffect} from 'react'
import TodoList from './TodoList'
import {v4 as uuidv4} from 'uuid';

import './App.css';



const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const todoRef = useRef()
  const [todos, SetTodos] = useState([])

  function toggleTodo(id){
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)  
    todo.complete = !todo.complete
    SetTodos(newTodos)
  }

  function handleAddTodo(e){
    const Name = todoRef.current.value
    if(Name === '') return
    SetTodos(prevTodo => {
      return [...prevTodo, { id: uuidv4(), name: Name, complete: false }]
    })
    todoRef.current.value = null  
  }

  useEffect(() => {
    const storedTodos = localStorage.getItem(LOCAL_STORAGE_KEY) 
    if(storedTodos){
      SetTodos(JSON.parse(storedTodos))
    } 
  },[])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function handleComplete() {
    const setTodo = todos.filter(todo => !todo.complete)
    SetTodos(setTodo)
  }

  return (
    <>
      <div className='container'>
      <h2 data-text = "Your To do List...">Your To do List...</h2>
      <div className='flex-container'>
        <input ref = {todoRef} type="text" placeholder='Enter Task' />
        <button onClick={handleAddTodo}>Add Todo</button>
        <button onClick={handleComplete}>Clear Completed</button>
      </div>
      <div className='Todo-container'>
      <TodoList todolist = {todos} toggleTodo={toggleTodo}/>
      </div>
      <div>{todos.filter(todo => !todo.complete).length} Left to do</div>
      </div>
    </>
  )
}

export default App;
