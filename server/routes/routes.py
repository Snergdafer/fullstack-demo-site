from fastapi import APIRouter

from server.routes.todoRoutes import router as todoRouter
from server.routes.userRoutes import router as userRouter

router = APIRouter()

router.include_router(router=todoRouter)
router.include_router(router=userRouter)