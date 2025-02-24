import { useState, useEffect } from "react";
import { getTodos, logout } from "../Api";
import { StatusOptions } from "../App";
import TodoList from "../Components/TodoList";
import AccountButton from "../Components/AccountButton";

const Dashboard = ({ setToken }) => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState(null);
  const [freshTodos, setFreshTodos] = useState([]);

  const newTodoTemplate = {
    name: "",
    status: StatusOptions.todo,
  };

  useEffect(() => {
    getTodos(setTodos);
  }, []);

  useEffect(() => {
    setTodos(freshTodos);
  }, [freshTodos]);

  const handleSetTodos = (newTodos) => {
    newTodos ? setFreshTodos(newTodos) : setTodos([]);
  };

  const createTodo = () => {
    setNewTodo({
      name: "",
      status: StatusOptions.todo,
    });
  };

  const filterTodos = (filter) => {
    const todoTodos = todos.filter(
      (todo) => todo.status === StatusOptions.todo,
    );
    const inProgressTodos = todos.filter(
      (todo) => todo.status === StatusOptions.inProgress,
    );
    const completeTodos = todos.filter(
      (todo) => todo.status === StatusOptions.complete,
    );
    const orderedTodos =
      filter === StatusOptions.todo
        ? [...todoTodos, ...inProgressTodos, ...completeTodos]
        : filter === StatusOptions.inProgress
          ? [...inProgressTodos, ...todoTodos, ...completeTodos]
          : [...completeTodos, ...todoTodos, ...inProgressTodos];

    handleSetTodos(orderedTodos);
  };

  const handleLogout = () => {
    setToken(null);
    logout();
  };

  return (
    <div className="h-400 w-full flex flex-col bg-[#b1bfcc] ">
      <div className="flex px-6 bg-[#7998b3] h-18 drop-shadow-sm rounded-sm">
        <div className="flex items-center font-bold text-xl w-50">
          The To-Do-Inator!
        </div>
        <div className="ml-auto my-auto">
          <AccountButton handleLogout={handleLogout} />
        </div>
      </div>
      <div className="flex w-full p-6">
        <button
          className="m-2 rounded-full h-12 w-12 pt-1"
          onClick={() => setNewTodo(newTodoTemplate)}
        >
          <span class="material-icons">add</span>
        </button>
      </div>
      <div>
        <TodoList
          todos={todos}
          setTodos={handleSetTodos}
          newTodo={newTodo}
          setNewTodo={setNewTodo}
          filterTodos={filterTodos}
        />
      </div>
    </div>
  );
};

export default Dashboard;
