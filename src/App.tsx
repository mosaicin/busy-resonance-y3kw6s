import React, { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Buy milk', completed: false },
    { id: 2, text: 'Walk the dog', completed: false },
    { id: 3, text: 'Do homework', completed: false },
  ]);

  const [newTodo, setNewTodo] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTodo.trim() === '') return;
    setTodos([...todos, { id: todos.length + 1, text: newTodo, completed: false }]);
    setNewTodo('');
  };

  const handleToggleCompleted = (id: number) => {
    setTodos(todos.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new todo"
          className="w-full p-2 pl-10 text-sm text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
        />
        <button
          type="submit"
          className="ml-2 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
        >
          Add
        </button>
      </form>
      <ul className="mt-4">
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center justify-between py-2">
            <span
              className={`text-lg ${todo.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}
            >
              {todo.text}
            </span>
            <div className="flex items-center">
              <button
                onClick={() => handleToggleCompleted(todo.id)}
                className={`mr-2 py-1 px-2 ${todo.completed ? 'bg-gray-400' : 'bg-blue-500'} text-white rounded-lg hover:bg-blue-700`}
              >
                {todo.completed ? 'Undo' : 'Done'}
              </button>
              <button
                onClick={() => handleDelete(todo.id)}
                className="py-1 px-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;