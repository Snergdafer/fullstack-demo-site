import axios from "axios";
import Cookies from "js-cookie";

const baseUrl = "http://127.0.0.1:8000";

export const login = (body, setToken, setUserId) =>
  axios({
    method: "post",
    url: `${baseUrl}/authentication/login`,
    data: body,
  }).then((response) => {
    setToken(response.data.access_token);
    setUserId(response.data.user_id);
    Cookies.set("token", response.data.access_token, { secure: true });
  });

export const register = (body, setSuccess) =>
  axios({
    method: "post",
    url: `${baseUrl}/authentication/register`,
    data: body,
  }).then((response) => {
    setSuccess(response.data.Ok);
  });

export const logout = () =>
  axios({
    method: "post",
    url: `${baseUrl}/authentication/logout`,
  }).then((response) => {
    Cookies.remove("token");
  });

export const getTodos = (userId, setTodos) =>
  axios({
    method: "get",
    url: `${baseUrl}/user/${userId}/todo-list`,
    headers: { Authorization: `Bearer ${Cookies.get("token")}` },
  }).then((response) => {
    setTodos(response.data);
  });

export const updateTodo = (userId, todoId, todo, setTodos) =>
  axios({
    method: "put",
    url: `${baseUrl}/user/${userId}/todo-item/${todoId}`,
    headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    data: todo,
  }).then((response) => {
    setTodos(response.data);
  });

export const createTodo = (userId, body, setTodos) =>
  axios({
    method: "post",
    url: `${baseUrl}/user/${userId}/todo-item`,
    data: body,
    headers: { Authorization: `Bearer ${Cookies.get("token")}` },
  }).then((response) => {
    setTodos(response.data);
  });

export const deleteTodo = (userId, todoItemId, setTodos) =>
  axios({
    method: "delete",
    url: `${baseUrl}/user/${userId}/todo-item/${todoItemId}`,
    headers: { Authorization: `Bearer ${Cookies.get("token")}` },
  }).then((response) => {
    setTodos(response.data);
  });
