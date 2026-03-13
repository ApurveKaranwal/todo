import { useState, useEffect } from 'react'
import './App.css'
import { CreateTodo } from './components/CreateTodo'
import { Todos } from './components/Todos'

function App() {
  const [todos, setTodos] = useState([])

  function fetchTodos() {
    fetch('http://localhost:8080/todos')
      .then(async function (res) {
        const json = await res.json()
        setTodos(json.todos)
      })
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  return (
    <div>
      <CreateTodo onTodoAdded={fetchTodos}></CreateTodo>
      <Todos todos={todos} onUpdate={fetchTodos}></Todos>
    </div>
  )
}

export default App
