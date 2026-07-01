# MyFinance

Personal finance tracker I built to learn full-stack development. Tracks income and expenses, shows spending patterns, and uses AI to categorize transactions and give financial advice.

**Live:** https://getmyfinance.de

## What it does

- Add and delete income and expense transactions
- Dashboard showing balance, total income and total expenses
- Spending chart broken down by category
- AI auto-categorization: type a description and the category fills itself
- AI financial advice based on your actual transaction history
- Anomaly detection for unusual spending patterns
- Next month spending prediction

## How it was built

**Backend:** FastAPI + PostgreSQL + SQLAlchemy. REST API with endpoints for transactions and AI features.

**Frontend:** React + Vite + Recharts. Component-based UI connected to the backend via Axios.

**AI:** Claude API for categorization and financial advice. Anomaly detection and spending prediction use pure Python math.

**Deployment:** Backend on Render, frontend on Vercel, custom domain on Namecheap.

## Run it locally

**Backend:**
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload

**Frontend:**
cd frontend-react
npm install
npm run dev

**Environment variables, create backend/.env:**
ANTHROPIC_API_KEY=your_key
DATABASE_URL=your_postgresql_url

## Stack

Python, FastAPI, PostgreSQL, SQLAlchemy, React, Recharts, Claude API, Docker, Render, Vercel

## Note

This is a portfolio project built for learning purposes. Not intended for public use with real financial data.
