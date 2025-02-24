import axios from "axios";
import Cookies from "js-cookie";

const baseUrl = "http://127.0.0.1:8000";

export const login = (body, setToken) =>
  axios({
    method: "post",
    url: `${baseUrl}/authentication/login`,
    data: body,
  }).then((response) => {
    setToken(response.data.access_token);
    Cookies.set("token", response.data.access_token, { secure: true });
  });

export const register = (body, setToken) =>
  axios({
    method: "post",
    url: `${baseUrl}/authentication/register`,
    data: JSON.stringify(body),
  }).then((response) => {
    setToken(response.data.access_token);
  });

export const logout = () =>
  axios({
    method: "post",
    url: `${baseUrl}/authentication/logout`,
  }).then((response) => {
    Cookies.remove("token");
  });

export const getTodos = (setTodos) =>
  axios({
    method: "get",
    url: `${baseUrl}/todo-list`,
    headers: { Authorization: `Bearer ${Cookies.get("token")}` },
  }).then((response) => {
    setTodos(response.data);
  });

export const updateTodo = (todoId, todo, setTodos) =>
  axios({
    method: "put",
    url: `${baseUrl}/todo-item/${todoId}`,
    headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    data: todo,
  }).then((response) => {
    setTodos(response.data);
  });

export const createTodo = (body, setTodos) =>
  axios({
    method: "post",
    url: `${baseUrl}/todo-item`,
    data: body,
    headers: { Authorization: `Bearer ${Cookies.get("token")}` },
  }).then((response) => {
    setTodos(response.data);
  });

export const deleteTodo = (todoItemId, setTodos) =>
  axios({
    method: "delete",
    url: `${baseUrl}/todo-item/${todoItemId}`,
    headers: { Authorization: `Bearer ${Cookies.get("token")}` },
  }).then((response) => {
    setTodos(response.data);
  });
