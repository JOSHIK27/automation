from sqlmodel import SQLModel, Field

class User(SQLModel, table = True):
    name: str
    email: str = Field(default=None, primary_key=True) 