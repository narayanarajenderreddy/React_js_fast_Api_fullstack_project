from fastapi import APIRouter,Depends,HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import get_db
from app.dependencies.auth import get_current_user,get_current_membership
from app.models.membership import Membership

from app.schemas.project import (ProjectCreate,ProjectResponse,ProjectDelete,ProjectUpdate)

from app.services.project_service import (create_project, deleteproject,get_projects,get_project_by_id,update_project)

router = APIRouter()

@router.post("/create_new_project",response_model = ProjectResponse)
async def create_new_project(project: ProjectCreate, db: AsyncSession = Depends(get_db), current_membership = Depends(get_current_membership)):
    return await create_project(db=db, data=project, org_id=current_membership.org_id)

@router.get("/all_projects", response_model=list[ProjectResponse])
async def get_all_projects(db: AsyncSession = Depends(get_db)):
    return await get_projects(db=db)

@router.get("/{project_id}",response_model = ProjectResponse)
async def get_project(project_id:int,db:AsyncSession = Depends(get_db)):
    project = await get_project_by_id(db = db,project_id = project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project


@router.put("/{project_id}",response_model = ProjectResponse)
async def update_project_endpoint(project_id:int, project: ProjectUpdate, db: AsyncSession = Depends(get_db)):
    updated_project = await update_project(db=db, project_id=project_id, data=project)
    if not updated_project:
        raise HTTPException(status_code=404, detail="Project not found")
    return updated_project

@router.delete("/{project_id}")
async def delete_project(project_id: int, db: AsyncSession = Depends(get_db)):
    deleted = await deleteproject(db=db, project_id=project_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Project not found")
    return {"detail": "Project deleted"}