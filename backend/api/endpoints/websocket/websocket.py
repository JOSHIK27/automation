from fastapi import APIRouter, WebSocket

router = APIRouter()

connected_clients = {}


@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket, userId: str):
    await websocket.accept()
    while True:
        connected_clients[userId] = websocket
        data = await websocket.receive_text()
        await websocket.send_text(f"Hello {userId}")

def get_connected_clients():
    return connected_clients
