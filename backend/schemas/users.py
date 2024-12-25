from typing import Dict, List, Optional, Any, Union
from pydantic import BaseModel

class User(BaseModel):
    name: str
    email: str
    image: Optional[str] = None

class Node(BaseModel):
    id: str
    position: Dict[str, float]
    data: Dict[str, Any]
    type: str
    draggable: bool = True
    measured: Dict[str, int]
    selected: Optional[bool] = False

class Edge(BaseModel):
    id: str
    source: str
    target: str
    type: Optional[str] = None
    animated: bool = False
    markerEnd: Optional[Dict[str, Union[str, int]]] = {}

class WorkflowPayload(BaseModel):
    user_id: str
    nodes: List[Node]
    edges: List[Edge]
    name: str
    description: Optional[str] = None
     