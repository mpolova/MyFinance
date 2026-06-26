from sqlalchemy import Column, Integer, Float, String, DateTime
from datetime import datetime
from database import Base

# Transaction model. Represents a single financial transaction.
# Each instance of this class maps to one row in the transactions table.
class Transaction(Base):
    __tablename__ = "transactions"

    # Primary key. Auto-incremented by the database.
    id = Column(Integer, primary_key=True, index=True)

    # Amount of money. Stored as a float to support decimals.
    amount = Column(Float, nullable=False)

    # Type of transaction. Either "income" or "expense".
    type = Column(String, nullable=False)

    # Category of transaction. e.g. "food", "rent", "salary".
    category = Column(String, nullable=False)

    # Optional description provided by the user.
    description = Column(String, nullable=True)

    # Timestamp of when the transaction was created.
    # Defaults to the current time if not provided.
    date = Column(DateTime, default=datetime.utcnow)