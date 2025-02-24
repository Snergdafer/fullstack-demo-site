from pydantic import BaseModel
from sqlmodel import Field, SQLModel, Relationship
from enum import Enum

class UserBase(SQLModel):
    email: str

class User(UserBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    todo_items: list["TodoItem"] = Relationship(back_populates="user")
    password: str

class UserPublic(UserBase):
    todo_items: list["TodoItem"] | None = None
    password: str

class UserCreate(UserBase):
    password: str

class UserUpdate(UserBase):
    email: str | None = None
    password: str | None = None


class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: str | None = None

class AuthenticationResponse(BaseModel):
    access_token: str
    token_type: str
    user_id: int

# ------- TODOMODELS -------

class TodoStatus(Enum):
    todo = "To Do"
    inProgress = "In Progress"
    complete = "Complete"

class TodoItemBase(SQLModel):
    name: str
    status: TodoStatus

class TodoItem(TodoItemBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    user_id: int | None = Field(default=None, foreign_key="user.id")
    user: User | None = Relationship(back_populates="todo_items")

class TodoItemPublic(TodoItemBase):
    user_id: int
    id: int

class TodoItemCreate(TodoItemBase):
    user_id: int
    status: TodoStatus

class TodoItemUpdate(TodoItemBase):
    name: str | None = None
    status: TodoStatus | None = None
