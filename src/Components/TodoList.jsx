import { useState } from "react";
import Todo from "./Todo";
import { StatusOptions } from "../App";
import { Reorder } from "framer-motion";

const TodoList = ({
  todos,
  setTodos,
  newTodo,
  setNewTodo,
  filterTodos,
  userId,
}) => {
  const [statusFilter, setStatusFilter] = useState(null);

  const handleFilterChange = (value) => {
    filterTodos(value);
    setStatusFilter(value);
  };

  return (
    <div className="flex flex-col h-full w-2/3 bg-[#c8d7e6] rounded-lg drop-shadow-lg align-middle mx-auto px-6 mt-12">
      <div className="flex items-center justify-between h-20">
        <text className="text-lg text-gray-700 font-semibold">Todo List:</text>
        <div>
          <text className="mr-1 text-gray-700 font-semibold">Filter By: </text>
          <select
            name="select"
            onChange={(e) => handleFilterChange(e.target.value)}
            className="border-2 border-blue-300 rounded-md bg-gray-700 p-1"
          >
            {Object.values(StatusOptions).map((n, i) => (
              <option key={i} value={n} selected={statusFilter === n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>
      <Reorder.Group values={todos} onReorder={setTodos}>
        {newTodo && (
          <Todo
            todo={newTodo}
            setTodos={setTodos}
            isNew
            setNewTodo={setNewTodo}
            userId={userId}
          />
        )}
        {todos.map((todo) => (
          <Todo key={todo.id} todo={todo} setTodos={setTodos} userId={userId} />
        ))}
      </Reorder.Group>
    </div>
  );
};

export default TodoList;
