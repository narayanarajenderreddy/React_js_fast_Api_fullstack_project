from fastapi import Depends, HTTPException

from app.dependencies.auth import (
    get_current_membership
)


def require_role(required_role: str):

    async def role_checker(
        membership = Depends(get_current_membership)
    ):

        if membership.role != required_role:
            raise HTTPException(
                status_code=403,
                detail="Permission denied"
            )

        return membership

    return role_checker