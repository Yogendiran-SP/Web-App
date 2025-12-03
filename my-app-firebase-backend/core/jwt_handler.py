from datetime import datetime, timedelta
import os
from pathlib import Path
from typing import Any, Dict

from dotenv import load_dotenv
from jose import jwt

env_path = Path(__file__).resolve().parents[1] / ".env"
load_dotenv(dotenv_path=env_path)

_secret_key = os.getenv("SECRET_KEY")
if not _secret_key:
    raise RuntimeError(
        "SECRET_KEY is missing. Add it to your .env file "
        "before starting the app."
    )
SECRET_KEY = _secret_key

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60


def create_access_token(
    data: Dict[str, Any],
    expires_delta: timedelta | None = None,
) -> str:
    to_encode = data.copy()
    expire_delta = expires_delta or timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )
    expire = datetime.utcnow() + expire_delta
    to_encode["exp"] = int(expire.timestamp())
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
