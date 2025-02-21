from server.routes.routes import router
from server.database.database import create_db_and_tables

from fastapi import FastAPI


app = FastAPI()
app.include_router(router=router)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()