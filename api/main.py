from fastapi import FastAPI
from neo4j_driver import get_db
from queries.transaction_queries import get_user_transactions, create_transaction
from queries.analytics_queries import get_spending_by_category
from queries.category_queries import get_all_categories
from queries.user_queries import get_user_overview
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Pydantic model for transaction request validation
class TransactionRequest(BaseModel):
    description: str
    amount: float
    category: str
    type: str  # "income" or "expense"
    date: str  # ISO format date string

# Allow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

driver = get_db()


@app.get("/")
def root():
    return {"message": "Neo4j Finance API is running"}


@app.get("/user/{user_id}")
def user_overview(user_id: int):
    return get_user_overview(driver, user_id)


@app.get("/transactions/{user_id}")
def transactions(user_id: int):
    return get_user_transactions(driver, user_id)


@app.post("/transactions/{user_id}")
def create_user_transaction(user_id: int, transaction: TransactionRequest):
    return create_transaction(
        driver,
        user_id,
        transaction.description,
        transaction.amount,
        transaction.category,
        transaction.type,
        transaction.date
    )


@app.get("/categories")
def categories():
    return get_all_categories(driver)


@app.get("/analytics/spending/{user_id}")
def spending_by_category(user_id: int):
    return get_spending_by_category(driver, user_id)
