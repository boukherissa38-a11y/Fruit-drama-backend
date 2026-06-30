from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, field_validator
from passlib.context import CryptContext
import sqlite3
import os
import re
import stripe

STRIPE_SECRET_KEY = os.getenv("STRIPE_SECRET_KEY")
STRIPE_PRICE_ID = os.getenv("STRIPE_PRICE_ID")
FRONTEND_URL = os.getenv(
    "FRONTEND_URL",
    "https://site-web-creation.vercel.app"
)

stripe.api_key = STRIPE_SECRET_KEY

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

DB_PATH = os.path.join(os.path.dirname(__file__), "users.db")

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    conn.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
    """)
    conn.commit()
    conn.close()

init_db()

EMAIL_RE = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")

class UserIn(BaseModel):
    email: str
    password: str

    @field_validator("email")
    @classmethod
    def email_valid(cls, v):
        if not EMAIL_RE.match(v):
            raise ValueError("Email invalide")
        return v

    @field_validator("password")
    @classmethod
    def password_min_length(cls, v):
        if len(v) < 6:
            raise ValueError("Le mot de passe doit contenir au moins 6 caractères")
        return v

@app.post("/register")
def register(user: UserIn):
    conn = get_db()
    existing = conn.execute(
        "SELECT id FROM users WHERE email = ?", (user.email,)
    ).fetchone()

    if existing:
        conn.close()
        return {"error": "user_exists"}

    password_hash = pwd_context.hash(user.password)
    conn.execute(
        "INSERT INTO users (email, password_hash) VALUES (?, ?)",
        (user.email, password_hash)
    )
    conn.commit()
    conn.close()

    return {"status": "created"}

@app.post("/login")
def login(user: UserIn):
    conn = get_db()
    row = conn.execute(
        "SELECT password_hash FROM users WHERE email = ?", (user.email,)
    ).fetchone()
    conn.close()

    if row is None:
        return {"error": "not_found"}

    if not pwd_context.verify(user.password, row["password_hash"]):
        return {"error": "wrong_password"}

    return {"status": "ok"}

@app.get("/")
def home():
    return {"status": "backend_ok"}
