from __future__ import annotations

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.user import User
from app.models.workspace import Workspace, WorkspaceMember
from app.services.auth import decode_access_token


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
    )
    try:
        payload = decode_access_token(token)
        user_id = payload.get("sub")
        if not user_id:
            raise credentials_exception
    except Exception as exc:  # noqa: BLE001
        raise credentials_exception from exc

    user = db.get(User, user_id)
    if not user:
        raise credentials_exception
    return user


def require_workspace_member(
    workspace_id: str,
    user: User,
    db: Session,
) -> Workspace:
    workspace = db.get(Workspace, workspace_id)
    if not workspace:
        raise HTTPException(status_code=404, detail="Workspace not found")

    membership = (
        db.query(WorkspaceMember)
        .filter(
            WorkspaceMember.workspace_id == workspace_id,
            WorkspaceMember.user_id == user.id,
        )
        .first()
    )
    if not membership:
        raise HTTPException(status_code=403, detail="Forbidden")
    return workspace

