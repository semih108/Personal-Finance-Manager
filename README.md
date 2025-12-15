# Personal Finance Manager

A full-stack personal finance management application using React, FastAPI, and a Neo4j graph database.

---

## Project Structure

```text
Personal-Finance-Manager/
├── api/                        # Backend (FastAPI + Neo4j)
│   ├── queries/
│   │   ├── analytics_queries.py
│   │   ├── category_queries.py
│   │   ├── transaction_queries.py
│   │   └── user_queries.py
│   ├── main.py
│   ├── neo4j_driver.py
│   └── requirements.txt
│
├── frontend/                   # Frontend (React + Vite)
│   ├── src/
│   │   ├── Components/
│   │   ├── Contexts/
│   │   ├── Hooks/
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
```

---

## Features

- **Transaction Management**: Add, view, and track income and expenses  
- **Expense Analytics**: Visual breakdown of expenses by category  
- **User Profiles**: View user information and account balances  
- **Budget Planning**: Track and plan budgets  
- **Forecasting**: Predict future expenses based on historical data  
- **Real-time Charts**: Interactive charts using Chart.js  

---

## Tech Stack

### Backend
- **FastAPI** – Python web framework
- **Neo4j** – Graph database
- **Python 3.13**
- **Pydantic** – Data validation

### Frontend
- **React 18**
- **Vite**
- **Bootstrap 5**
- **Chart.js**
- **Axios**

---

## Prerequisites

- Python 3.13+
- Node.js 16+
- Neo4j Aura account or local Neo4j instance

---

## Installation

### Backend Setup

1. Navigate to the backend directory:
```bash
cd api
````

2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Configure Neo4j connection in `neo4j_driver.py`:

* Set `URI`
* Set `USER`
* Set `PASSWORD`

4. Start the backend server:

```bash
uvicorn main:app --reload
```

Backend runs at:

```
http://127.0.0.1:8000
```

---

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## API Endpoints

### User

* `GET /user/{user_id}` – Get user profile and accounts

### Transactions

* `GET /transactions/{user_id}` – Get all user transactions
* `POST /transactions` – Create a transaction

### Categories

* `GET /categories` – Get all categories

### Analytics

* `GET /analytics/spending/{user_id}` – Spending by category

---

## Usage Example

### Add a Transaction via API

```bash
curl -X POST http://127.0.0.1:8000/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": 1,
    "amount": -25.50,
    "description": "Lunch",
    "date": "2024-01-05",
    "type": "expense",
    "category": "Food",
    "merchant": "Restaurant",
    "account_name": "Main"
  }'
```

---

## Database Schema

### Nodes

* `User`
* `Account`
* `Transaction`
* `Category`
* `Merchant`

### Relationships

* `(:User)-[:OWNS]->(:Account)`
* `(:Account)-[:HAS_TRANSACTION]->(:Transaction)`
* `(:Transaction)-[:IN_CATEGORY]->(:Category)`
* `(:Transaction)-[:TO_MERCHANT]->(:Merchant)`

---

## License

This project is created for educational purposes.

