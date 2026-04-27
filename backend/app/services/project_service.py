from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.models.project import Project


async def create_project(db:AsyncSession,data,org_id:int):
    project_details = Project(
        name = data.name,
        description = data.description,
        org_id = org_id
    )
    
    db.add(project_details)
    await db.commit()
    await db.refresh(project_details)
    return project_details

async def get_projects(db:AsyncSession):
    project_list = await db.execute(select(Project))
    return project_list.scalars().all()


async def get_project_by_id(db:AsyncSession, project_id:int):
    project = await db.execute(select(Project).where(Project.id == project_id))
    return project.scalar_one_or_none()


async def update_project(db:AsyncSession,project_id:int,data):
    project = await db.execute(select(Project).where(Project.id == project_id))
    project_details = project.scalar_one_or_none()
    
    if project_details:
        project_details.name = data.name
        project_details.description = data.description
        await db.commit()
        await db.refresh(project_details)
        return project_details
    return None


async def deleteproject(db:AsyncSession,project_id:int):
    project = await db.execute(select(Project).where(Project.id == project_id))
    project_details = project.scalar_one_or_none()
    
    if project_details:
        await db.delete(project_details)
        await db.commit()
        return True
    return False