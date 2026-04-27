from pydantic import BaseModel

class ProjectCreate(BaseModel):
    name:str
    description:str
    
class ProjectUpdate(BaseModel):
    name:str
    description:str

class ProjectDelete(BaseModel):
    id:int
    
class ProjectResponse(BaseModel):
    id:int
    name:str
    description:str
    org_id:int
    
    class Config:
        from_attribute = True            
    