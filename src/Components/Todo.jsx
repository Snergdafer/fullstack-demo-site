import { deleteTodo, updateTodo, createTodo } from "../Api";
import { useState } from "react";
import { StatusOptions } from "../App";

const Todo = ({ todo, setTodos, isNew = false, setNewTodo = () => {} }) => {
  const [isSelected, setIsSelected] = useState(isNew);
  const [todoName, setTodoName] = useState(todo.name);
  const [todoStatus, setTodoStatus] = useState(todo.status);
  const [error, setError] = useState(null);

  const handleUpdateTodo = () => {
    if (isNew) {
      if (todoName && todoStatus) {
        createTodo({ name: todoName, status: todoStatus }, setTodos);
        setNewTodo(null);
      } else {
        setError("Todos need a name and a status");
      }
    } else {
      let updatedTodo = {};

      if (todo.name !== todoName) {
        updatedTodo.name = todoName;
      }

      if (todoStatus && todo.status !== todoStatus) {
        updatedTodo.status = todoStatus;
      }

      if (updatedTodo) {
        updateTodo(todo.id, updatedTodo, setTodos);
      }

      setIsSelected(false);
    }
  };

  const handleDeleteTodo = () => {
    if (isNew) {
      setNewTodo(null);
    } else {
      deleteTodo(todo.id, setTodos);
    }
  };

  const handleToggleSelected = () => {
    if (isNew) {
      setNewTodo(null);
    } else {
      setIsSelected(!isSelected);
    }
  };

  return (
    <div className="flex flex-row justify-between bg-[#86a4bf] rounded-lg m-1 px-4 py-1 drop-shadow-md">
      <input
        disabled={!isSelected}
        value={todoName}
        onChange={(e) => setTodoName(e.target.value)}
        className={
          isSelected
            ? "border-2 border-blue-300 rounded-md w-60 bg-gray-700 p-1"
            : ""
        }
      />
      <label className="self-center">
        Status:
        <select
          name="select"
          onChange={(e) => setTodoStatus(e.target.value)}
          defaultValue={todo.status}
          disabled={!isSelected}
          className={
            (isSelected &&
              "border-2 border-blue-300 rounded-md w-35 bg-gray-700 p-1") +
            " mx-2"
          }
        >
          {Object.values(StatusOptions).map((n, i) => (
            <option key={i} value={n} selected={todoStatus === n}>
              {n}
            </option>
          ))}
        </select>
      </label>
      <div>
        {isSelected && (
          <button
            onClick={handleUpdateTodo}
            className="mr-2 h-11 w-14 pt-1 rounded-md"
          >
            <span class="material-icons">check</span>
          </button>
        )}
        <button
          onClick={handleToggleSelected}
          className="mr-2 h-11 w-14 pt-1 rounded-md"
        >
          <span class="material-icons">{isSelected ? "cancel" : "edit"}</span>
        </button>
        {isSelected && (
          <button
            onClick={handleDeleteTodo}
            className=" h-11 w-14 pt-1 rounded-md"
          >
            <span class="material-icons">delete</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Todo;
