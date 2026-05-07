from sqlalchemy import Column,Integer,String,ForeignKey
from sqlalchemy.orm import relationship

from app.core.database import Base


class Project(Base):
    __tablename__="projects"

    id=Column(Integer,primary_key=True)

    name=Column(String)
    description=Column(String)

    org_id=Column(
        Integer,
        ForeignKey("organizations.id")
    )

    organization=relationship(
       "Organization",
       back_populates="projects"
    )
    
    
    tasks = relationship(
    "Task",
    back_populates="project"
    )