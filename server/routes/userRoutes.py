from typing import Annotated
from datetime import datetime, timedelta, timezone

import jwt
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.context import CryptContext
from jwt.exceptions import InvalidTokenError
from sqlmodel import select

from server.models.models import User, AuthenticationResponse, UserCreate, Token
from server.database.database import SessionDep


#---------- Pretend .env ------------------
SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60
#------------------------------------------


router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="authentication/login")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def authenticate_user(session, email: str, requestPassword: str):
    user = session.exec(select(User).where(User.email == email)).first()
    if not user:
        return False
    if not verify_password(requestPassword, user.password):
        return False
    return user

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def validate_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            raise credentials_exception
    except InvalidTokenError:
        raise credentials_exception
    user = SessionDep.exec(select(User).where(User.email == username)).first()
    if user is None:
        raise credentials_exception

# -------- POST --------
@router.post("/authentication/login")
async def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], session: SessionDep):
    user = authenticate_user(session, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email }, expires_delta=access_token_expires
    )

    return AuthenticationResponse(access_token=access_token, token_type="bearer", user_id=user.id)

@router.post("/authentication/register")
async def register_new_user(user: UserCreate, session: SessionDep):
    db_user = User.model_validate(user)
    hashed_password = pwd_context.hash(db_user.password)
    db_user.password = hashed_password
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return {"Ok": True}


@router.post("/authentication/logout")
async def read_root():
    return {"Ok": True}


# -------- GET --------
