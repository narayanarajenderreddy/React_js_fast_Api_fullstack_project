from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.config import settings
from app.core.database import get_db
from app.models.user import User
from app.models.membership import Membership

security = HTTPBearer()


async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security),
                           db:AsyncSession = Depends(get_db)):
    token = credentials.credentials
    try:
        payload = jwt.decode(token,settings.SECRET_KEY,algorithms=[settings.ALGORITHM])
        user_id = payload.get("subject")
    except JWTError as e :
        raise HTTPException(status_code = 401,detail = "invalid token")
    result = await db.execute(select(User).where(User.email == user_id))
    user = result.scalar_one_or_none()
    #print("user detatils:",user)
    if not user:
        raise HTTPException(status_code = 404,detail = "user not found")
    return user


async def get_current_membership(current_user:User = Depends(get_current_user),db:AsyncSession = Depends(get_db)):
    result = await db.execute(select(Membership).where(Membership.user_id == current_user.id))
    membership = result.scalar_one_or_none()
    if not membership:
        raise HTTPException(status_code = 404,detail = "membership not found")
    return membership
