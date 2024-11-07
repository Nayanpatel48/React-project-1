import { useState, useEffect } from "react"
import { ToDoProvider } from "./contexts/ToDoContext"

function App() {

  const [todis, setTodis] = useState([])

  const addToDo = (todo) => {
    setTodis((prev)=>{
      [{id: Date.now(), ...todo}, ...prev]
    })
  }

  const updateToDo = (id, todo) =>{
    setTodis((prev) => prev.map((prevToDo) => (prevToDo.id === id ? todo : prevToDo)))
  }

  const deleteTodo = (id) =>{
    setTodis((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id) =>{
    setTodis((prev) => prev.map((prevToDo) => prevToDo === id 
    ? {...prevToDo, completed: !prevToDo.completed} : prevToDo))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if(todos && todos.length > 0){
      setTodis(todos)
    }
  },[])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todis))
  }, [todis]) 

  return (
    <ToDoProvider value={{todis, addToDo, updateToDo,deleteTodo, toggleComplete}}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
            <div className="mb-4">
              {/* Todo form goes here */} 
            </div>
            <div className="flex flex-wrap gap-y-3">
              {/*Loop and Add TodoItem here */}
            </div>
          </div>
      </div>
    </ToDoProvider>
  )
}

export default App