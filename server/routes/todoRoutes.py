from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlmodel import select

from server.models.todoModels import TodoItemCreate, TodoItemUpdate, TodoItem
from server.database.database import SessionDep


router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="authentication/login")

# -------- POST --------
@router.post("/todo-item")
def create_todo(todo_item: TodoItemCreate, session: SessionDep, logged_in: Annotated[str, Depends(oauth2_scheme)]):
    db_todo = TodoItem.model_validate(todo_item)
    session.add(db_todo)
    session.commit()
    session.refresh(db_todo)
    list = session.exec(select(TodoItem)).all()
    return list

# -------- GET --------
@router.get("/todo-list")
def read_todo_list(session: SessionDep, logged_in: Annotated[str, Depends(oauth2_scheme)]):
    list = session.exec(select(TodoItem)).all()
    return list

# -------- PUT --------
@router.put("/todo-item/{todo_id}")
def update_item(todo_id: int, todo_item: TodoItemUpdate, session: SessionDep, logged_in: Annotated[str, Depends(oauth2_scheme)]):
    todo_db = session.get(TodoItem, todo_id)
    if not todo_db:
        raise HTTPException(status_code=404, detail="Todo not found")
    todo_data = todo_item.model_dump(exclude_unset=True)
    todo_db.sqlmodel_update(todo_data)
    session.add(todo_db)
    session.commit()
    session.refresh(todo_db)
    return list

# -------- DELETE --------
@router.delete("/todo-item/{todo_item_id}")
def delete_todo_item(todo_item_id: int, session: SessionDep, logged_in: Annotated[str, Depends(oauth2_scheme)]):
    todo = session.get(TodoItem, todo_item_id)
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    session.delete(todo)
    session.commit()
    return {"ok": True}