from fastapi import APIRouter
import os
import resend
from typing import Dict
router = APIRouter()

resend.api_key = os.getenv("RESEND_API_KEY")

@router.get("/send-mail")
def send_mail() -> Dict:
    params: resend.Emails.SendParams = {
        "from": "creatorstream@resend.dev",
        "to": ["joshikroshan4021@gmail.com"],
        "subject": "Woahhh!! Here are your workflow results",
        "html": "<strong>it works!</strong>",
    }
    email: resend.Email = resend.Emails.send(params)
    return email




