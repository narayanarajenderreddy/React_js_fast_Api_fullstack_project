from pydantic import BaseModel


class TaskCreate(BaseModel):
    title: str
    description: str
    project_id: int


class TaskUpdate(BaseModel):
    title: str
    description: str
    status: str


class TaskResponse(BaseModel):
    id: int
    title: str
    description: str
    status: str
    project_id: int

    class Config:
        from_attributes = True