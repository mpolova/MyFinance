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

from ai import categorize_transaction, get_financial_advice, detect_anomalies, predict_spending

# Suggests a category for a transaction based on its description.
@app.post("/ai/categorize")
def ai_categorize(data: dict):
    description = data.get("description", "")
    if not description:
        raise HTTPException(status_code=400, detail="Description is required")
    category = categorize_transaction(description)
    return {"category": category}

# Returns personalized financial advice based on all transactions.
@app.get("/ai/advice")
def ai_advice(db: Session = Depends(get_db)):
    transactions = db.query(models.Transaction).all()
    transactions_data = [
        {
            "amount": t.amount,
            "type": t.type,
            "category": t.category,
            "description": t.description,
            "date": str(t.date)
        }
        for t in transactions
    ]
    advice = get_financial_advice(transactions_data)
    return {"advice": advice}

# Detects unusual spending patterns in transaction history.
@app.get("/ai/anomalies")
def ai_anomalies(db: Session = Depends(get_db)):
    transactions = db.query(models.Transaction).all()
    transactions_data = [
        {"amount": t.amount, "type": t.type, "category": t.category}
        for t in transactions
    ]
    anomalies = detect_anomalies(transactions_data)
    return {"anomalies": anomalies}

# Predicts next month spending based on transaction history.
@app.get("/ai/predict")
def ai_predict(db: Session = Depends(get_db)):
    transactions = db.query(models.Transaction).all()
    transactions_data = [
        {"amount": t.amount, "type": t.type, "category": t.category}
        for t in transactions
    ]
    predictions = predict_spending(transactions_data)
    return {"predictions": predictions}