from pydantic import BaseModel
from sqlmodel import Field, SQLModel

class UserBase(SQLModel):
    email: str
    full_name: str | None = None

class User(UserBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    password: str

class UserPublic(UserBase):
    password: str

class UserCreate(UserBase):
    password: str

class UserUpdate(UserBase):
    email: str | None = None
    full_name: str | None = None
    password: str | None = None


class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: str | None = None