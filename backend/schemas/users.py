from typing import Dict, List
from pydantic import BaseModel

class User(BaseModel):
    name: str
    email: str
    image: str | None = None

class Node(BaseModel):
    id: str
    position: Dict[str, float]
    data: Dict[str, any]
    type: str
    draggable: bool = True
    width: float | None = None
    height: float | None = None

class Edge(BaseModel):
    id: str
    source: str
    target: str
    type: str | None = None
    animated: bool = False
    markerEnd: Dict[str, str] | None = None

class WorkflowPayload(BaseModel):
    user_id: str
    nodes: List[Node]
    edges: List[Edge]
    name: str | None = None
