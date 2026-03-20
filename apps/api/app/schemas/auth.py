from pydantic import BaseModel, ConfigDict, EmailStr


class UserCreate(BaseModel):
    username: str
    email: EmailStr | None = None
    password: str
    display_name: str | None = None


class UserLogin(BaseModel):
    account: str
    password: str


class UserRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    username: str
    email: EmailStr | None = None
    display_name: str | None = None


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserRead

