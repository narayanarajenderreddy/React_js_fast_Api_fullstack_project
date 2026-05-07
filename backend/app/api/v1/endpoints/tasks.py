from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.dependencies.auth import get_current_user
from app.models.project import Project
from app.models.membership import Membership
from sqlalchemy import select

from app.schemas.task import TaskCreate, TaskUpdate

from app.services.task_service import (
    create_task,
    get_tasks,
    update_task,
    delete_task,
    get_all_tasks
)

router = APIRouter()


@router.post("/create_new_task")
async def create_new_task(
    task: TaskCreate,
    db: AsyncSession = Depends(get_db),
    current_user = Depends(get_current_user)
):
    print(task)
    
    membership_result = await db.execute(
        select(Membership).where(Membership.user_id == current_user.id)
    )
    
    membership = membership_result.scalar_one()
    
    project_result = await db.execute(
        select(Project).where(Project.id == task.project_id,
                              Project.org_id == membership.org_id)
    )
    
    project = project_result.scalar_one_or_none()
    
    if not project:
        raise HTTPException(
            status_code = 403,
            detail = "Not allowed"
        )
    return await create_task(db, task)

@router.get("/all_tasks")
async def get_project_tasks(db: AsyncSession = Depends(get_db)):
    return await get_all_tasks(db=db)


@router.get("/{project_id}")
async def list_tasks(
    project_id: int,
    db: AsyncSession = Depends(get_db),
    current_user = Depends(get_current_user)
):
    membership_result = await db.execute(
        select(Membership).where(Membership.user_id == current_user.id)
    )
    
    membership = membership_result.scalar_one()
    
    project_result = await db.execute(
        select(Project).where(Project.id == project_id.id,
                              Project.org_id == membership.org_id)
    )
    
    project = project_result.scalar_one_or_none()
    
    if not project:
        raise HTTPException(
            status_code = 403,
            detail = "Not allowed"
        )
    
    
    return await get_tasks(db, project_id)


@router.put("/{task_id}")
async def update_task_api(
    task_id: int,
    data: TaskUpdate,
    db: AsyncSession = Depends(get_db),
    current_user = Depends(get_current_user)
):
    task = await update_task(db, task_id, data)

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    return task


@router.delete("/{task_id}")
async def delete_task_api(
    task_id: int,
    db: AsyncSession = Depends(get_db),
    current_user = Depends(get_current_user)
):
    task = await delete_task(db, task_id)

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    return task