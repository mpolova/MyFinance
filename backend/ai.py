import os
import anthropic
from dotenv import load_dotenv
from collections import defaultdict
from datetime import datetime

# Load environment variables from .env file.
load_dotenv()

# Initialize the Anthropic client with the API key from .env.
client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

# Uses Claude API to suggest a category for a transaction based on its description.
def categorize_transaction(description: str) -> str:
    message = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=50,
        messages=[
            {
                "role": "user",
                "content": f"""Categorize this transaction into exactly one of these categories:
food, groceries, restaurant, coffee, rent, housing, utilities, transport, car, fuel,
salary, freelance, bonus, investment, entertainment, cinema, music, gaming, shopping,
clothes, electronics, health, gym, pharmacy, travel, hotel, education, subscriptions,
savings, insurance, gifts, pets, sport, other.

Transaction description: {description}

Reply with only the category name, nothing else."""
            }
        ]
    )
    return message.content[0].text.strip().lower()


# Uses Claude API to provide personalized financial advice based on transaction history.
def get_financial_advice(transactions: list) -> str:
    if not transactions:
        return "No transactions found. Add some transactions to get personalized advice."

    # Format transactions into a readable summary for Claude.
    total_income = sum(t["amount"] for t in transactions if t["type"] == "income")
    total_expenses = sum(t["amount"] for t in transactions if t["type"] == "expense")
    balance = total_income - total_expenses

    expense_by_category = defaultdict(float)
    for t in transactions:
        if t["type"] == "expense":
            expense_by_category[t["category"]] += t["amount"]

    summary = f"""Financial Summary:
Total Income: €{total_income:.2f}
Total Expenses: €{total_expenses:.2f}
Balance: €{balance:.2f}

Expenses by category:
{chr(10).join(f"- {cat}: €{amt:.2f}" for cat, amt in expense_by_category.items())}"""

    message = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=300,
        messages=[
            {
                "role": "user",
                "content": f"""You are a personal finance advisor. Based on this financial data, provide 3 specific, actionable pieces of advice. Be concise and direct.

{summary}

Provide exactly 3 numbered pieces of advice."""
            }
        ]
    )
    return message.content[0].text.strip()


# Detects unusual spending using Python math.
def detect_anomalies(transactions: list) -> list:
    if len(transactions) < 3:
        return []

    # Group expenses by category.
    category_amounts = defaultdict(list)
    for t in transactions:
        if t["type"] == "expense":
            category_amounts[t["category"]].append(t["amount"])

    anomalies = []

    for category, amounts in category_amounts.items():
        if len(amounts) < 2:
            continue

        # Calculate average and standard deviation.
        avg = sum(amounts) / len(amounts)
        variance = sum((x - avg) ** 2 for x in amounts) / len(amounts)
        std_dev = variance ** 0.5

        # Flag transactions more than 2 standard deviations above average.
        for amount in amounts:
            if std_dev > 0 and (amount - avg) / std_dev > 2:
                anomalies.append({
                    "category": category,
                    "amount": amount,
                    "average": round(avg, 2),
                    "message": f"Unusual spending in {category}: €{amount:.2f} vs average €{avg:.2f}"
                })

    return anomalies


# Predicts next month spending using Python math.
def predict_spending(transactions: list) -> dict:
    if not transactions:
        return {}

    # Group expenses by category.
    category_amounts = defaultdict(list)
    for t in transactions:
        if t["type"] == "expense":
            category_amounts[t["category"]].append(t["amount"])

    predictions = {}

    for category, amounts in category_amounts.items():
        # Simple average as prediction for next month.
        avg = sum(amounts) / len(amounts)
        predictions[category] = round(avg, 2)

    return predictions