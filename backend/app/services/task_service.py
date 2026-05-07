from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.models.task import Task


async def create_task(db:AsyncSession,data):
    task = Task(
        title = data.title,
        description = data.description,
        project_id = data.project_id
    )
    
    db.add(task)
    
    await db.commit()
    await db.refresh(task)
    
    return task

async def get_all_tasks(db:AsyncSession):
    task_list = await db.execute(select(Task))
    return task_list.scalars().all()

async def get_tasks(db:AsyncSession,project_id:int):
    result = await db.execute(
        select(Task).where(Task.project_id == project_id)
    )
    
    return result.scalars().all()


async def update_task(db:AsyncSession,task_id:int,data):
    result = await db.execute(
        select(Task).where(
            Task.id == task_id
        )
    )
    
    task = result.scalar_one_or_none()
    if not task:
        return {"message":"GIVEN TASK IS NOT THERE TO UPDATE"}
    
    task.title = data.title
    task.description = data.description
    task.status = data.status
    
    
    await db.commit()
    await db.refresh(task)
    return task


async def delete_task(db:AsyncSession,task_id:int):
    result = await db.execute(
        select(Task).where(Task.id == task_id)
    )
    
    task = result.scalar_one_or_none()
    
    if not task:
        return None
    await db.delete(task)
    await db.commit()
    return {"message":"Task has  been deleted"}
