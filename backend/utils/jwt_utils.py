from jose.jwe import decrypt
from hkdf import Hkdf
import json

def __encryption_key(secret: str):
    return Hkdf(bytes("authjs.session-token","utf-8"), bytes(secret, "utf-8")).expand(b"Auth.js Generated Encryption Key (authjs.session-token)", 64)

def decode_jwe(token: str, secret: str):
    e_key = __encryption_key(secret)
    decrypted = decrypt(token, e_key)

    if decrypted:
        return json.loads(bytes.decode(decrypted, "utf-8"))
    else:
        return None