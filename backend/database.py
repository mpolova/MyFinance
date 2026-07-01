import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

# Load environment variables from .env file.
load_dotenv()

# Database connection URL.
# Uses PostgreSQL in production, SQLite locally for development.
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./myfinance.db")

# Fix for PostgreSQL URL format from Render.
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

# Engine manages the connection to the database.
engine = create_engine(DATABASE_URL)

# SessionLocal is used to create individual database sessions per request.
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class that all database models will inherit from.
Base = declarative_base()

# Dependency that provides a database session to each endpoint.
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()