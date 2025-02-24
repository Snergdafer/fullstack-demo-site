from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlmodel import select

from server.models.models import TodoItemCreate, TodoItemUpdate, TodoItem, User
from server.database.database import SessionDep


router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="authentication/login")

# -------- POST --------
@router.post("/user/{user_id}/todo-item")
def create_todo(user_id: int, todo_item: TodoItemCreate, session: SessionDep, logged_in: Annotated[str, Depends(oauth2_scheme)]):
    db_todo = TodoItem.model_validate(todo_item)
    session.add(db_todo)
    session.commit()
    session.refresh(db_todo)
    list = session.exec(select(TodoItem).where(TodoItem.user_id == user_id)).all()
    return list

# -------- GET --------
@router.get("/user/{user_id}/todo-list")
def read_todo_list(session: SessionDep, user_id: int, logged_in: Annotated[str, Depends(oauth2_scheme)]):
    list = session.exec(select(TodoItem).where(TodoItem.user_id == user_id)).all()
    return list

# -------- PUT --------
@router.put("/user/{user_id}/todo-item/{todo_id}")
def update_item(user_id: int, todo_id: int, todo_item: TodoItemUpdate, session: SessionDep, logged_in: Annotated[str, Depends(oauth2_scheme)]):
    todo_db = session.get(TodoItem, todo_id)
    if not todo_db:
        raise HTTPException(status_code=404, detail="Todo not found")
    todo_data = todo_item.model_dump(exclude_unset=True)
    todo_db.sqlmodel_update(todo_data)
    session.add(todo_db)
    session.commit()
    session.refresh(todo_db)
    list = session.exec(select(TodoItem).where(TodoItem.user_id == user_id)).all()
    return list

# -------- DELETE --------
@router.delete("/user/{user_id}/todo-item/{todo_item_id}")
def delete_todo_item(user_id: int, todo_item_id: int, session: SessionDep, logged_in: Annotated[str, Depends(oauth2_scheme)]):
    todo = session.get(TodoItem, todo_item_id)
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    session.delete(todo)
    session.commit()
    list = session.exec(select(TodoItem).where(TodoItem.user_id == user_id)).all()
    return list