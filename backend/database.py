from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Database connection URL. Using SQLite locally for development.
# TODO: replace with PostgreSQL connection string before deployment.
DATABASE_URL = "sqlite:///./myfinance.db"

# Engine manages the connection to the database.
engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
)

# SessionLocal is used to create individual database sessions per request.
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class that all database models will inherit from.
Base = declarative_base()

# Dependency that provides a database session to each endpoint.
# Automatically closes the session when the request is done.
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()