# from typing import List
from enum import Enum
from sqlmodel import Field, SQLModel



class TodoStatus(Enum):
    todo = "To Do"
    inProgress = "In Progress"
    complete = "Complete"

class TodoItemBase(SQLModel):
    name: str
    status: TodoStatus

class TodoItem(TodoItemBase, table=True):
    id: int | None = Field(default=None, primary_key=True)

class TodoItemPublic(TodoItemBase):
    id: int

class TodoItemCreate(TodoItemBase):
    status: TodoStatus

class TodoItemUpdate(TodoItemBase):
    name: str | None = None
    status: TodoStatus | None = None
