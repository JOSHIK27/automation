from pydantic import BaseModel

class User(BaseModel):
    name: str
    email: str
    image: str

class Node(BaseModel):
    id: str
    position: dict
    data: dict
    type: str
    draggable: bool

class Edge(BaseModel):
    id: str
    source: str
    target: str
    type: str
    animated: bool
    markerEnd: dict

class Workflow(BaseModel):
    nodes: list[Node]
    edges: list[Edge]