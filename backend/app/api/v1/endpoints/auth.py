from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.schemas.user import UserCreate, UserLogin
from app.models.user import User
from app.models.membership import Membership
from app.models.organization import Organization
from app.core.database import get_db
from app.core.security import hash_password, verify_password, create_access_token
from app.dependencies.auth import get_current_user


router = APIRouter()


@router.post("/register")
async def register(user:UserCreate,db:AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.email == user.email))
    existing_user = result.scalars().first()
    if existing_user:
        raise HTTPException(status_code = 400,detail = "Email already registered")
    try:
        hashed_password = hash_password(user.password)
        new_user = User(email = user.email,password = hashed_password)
        db.add(new_user)
        await db.flush()
        
        #create default organization for the user
        organ = Organization(
            name = user.email,
            owner_id = new_user.id
        )
        db.add(organ)
        await db.flush()
        
        #create membership for the user in the organization
        membership = Membership(
            user_id = new_user.id,
            org_id = organ.id,
            role = "owner"
        )
        db.add(membership)
        await db.commit()
        return {"message":"User resgistered successfully",
                "organization":organ.name}
        
    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code = 500,
            detail = "An error occured during registration"
        )


@router.post("/login")
async def login(user:UserLogin,db:AsyncSession = Depends(get_db)):
    #result = await db.query(User).filter(User.email == user.email).first()
    result = await db.execute(select(User).where(User.email == user.email))
    existing_user = result.scalars().first()
    if not existing_user:
        raise HTTPException(status_code = 400,detail = "invalid email or password")
    if not verify_password(user.password,existing_user.password):
        raise HTTPException(status_code = 400,detail = "credential is not  valid")
    access_token = create_access_token(data = {"subject": existing_user.email})
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me")
async def read_current_user(current_user:User = Depends(get_current_user)):
    return {
        "id":current_user.id,
        "email":current_user.email,
        "role":current_user.role
    }
