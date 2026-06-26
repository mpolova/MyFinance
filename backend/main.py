from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
import models
import schemas
from database import engine, get_db

# Create all database tables on startup.
models.Base.metadata.create_all(bind=engine)

# Main application instance. All routes and middleware register here.
app = FastAPI(
    title="MyFinance API",
    description="Personal finance tracker with AI powered categorization and insights",
    version="1.0.0"
)

# CORS middleware. Permits cross-origin requests between frontend and backend.
# TODO: restrict allow_origins to the production domain before deployment.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check endpoint. Used to verify the service is running.
@app.get("/")
def read_root():
    return {"status": "ok", "message": "MyFinance API is running!"}

# Returns a list of all transactions from the database.
@app.get("/transactions", response_model=List[schemas.TransactionResponse])
def get_transactions(db: Session = Depends(get_db)):
    transactions = db.query(models.Transaction).all()
    return transactions

# Creates a new transaction and saves it to the database.
@app.post("/transactions", response_model=schemas.TransactionResponse)
def create_transaction(transaction: schemas.TransactionCreate, db: Session = Depends(get_db)):
    db_transaction = models.Transaction(**transaction.dict())
    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    return db_transaction

# Deletes a transaction by id. Returns 404 if not found.
@app.delete("/transactions/{transaction_id}")
def delete_transaction(transaction_id: int, db: Session = Depends(get_db)):
    transaction = db.query(models.Transaction).filter(models.Transaction.id == transaction_id).first()
    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")
    db.delete(transaction)
    db.commit()
    return {"message": "Transaction deleted successfully"}