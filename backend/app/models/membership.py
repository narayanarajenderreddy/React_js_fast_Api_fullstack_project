from sqlalchemy import Column,Integer,String,ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base


class Membership(Base):
    __tablename__="memberships"

    id = Column(Integer, primary_key=True)

    user_id = Column(Integer, ForeignKey("users.id"))
    org_id = Column(Integer, ForeignKey("organizations.id"))

    role = Column(String, default="member")


    user = relationship(
        "User",
        back_populates="memberships"
    )

    organization = relationship(
        "Organization",
        back_populates="memberships"
    )