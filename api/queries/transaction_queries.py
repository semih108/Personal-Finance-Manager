from neo4j import Record
from datetime import datetime
import uuid

def get_user_transactions(driver, user_id: int):
    with driver.session() as session:
        result = session.run(
            """
            MATCH (u:User {id: $id})-[:OWNS]->(a:Account)-[:HAS_TRANSACTION]->(t)
            OPTIONAL MATCH (t)-[:TO_MERCHANT]->(m)
            OPTIONAL MATCH (t)-[:IN_CATEGORY]->(c)
            RETURN t, m, c
            ORDER BY t.date
            """,
            id=user_id
        )

        transactions = []
        for record in result:
            t = dict(record["t"])
            m = dict(record["m"]) if record["m"] else None
            c = dict(record["c"]) if record["c"] else None

            transactions.append({
                "id": t.get("id"),
                "amount": t.get("amount"),
                "description": t.get("description"),
                "date": str(t.get("date")),
                "merchant": m.get("name") if m else None,
                "category": c.get("name") if c else None
            })

        return transactions


def create_transaction(driver, user_id: int, description: str, amount: float, category: str, merchant: str, transaction_type: str, date: str):
    """
    Create a new transaction for a user.
    
    Args:
        driver: Neo4j driver instance
        user_id: User ID
        description: Transaction description
        amount: Transaction amount
        category: Category name
        merchant: Merchant name
        transaction_type: "income" or "expense"
        date: ISO format date string
    
    Returns:
        Created transaction details or error message
    """
    with driver.session() as session:
        try:
            # Generate unique transaction ID
            transaction_id = str(uuid.uuid4())
            
            # Create transaction and link it to user's account, category, and merchant
            result = session.run(
                """
                MATCH (u:User {id: $user_id})-[:OWNS]->(a:Account)
                CREATE (t:Transaction {
                    id: $transaction_id,
                    description: $description,
                    amount: $amount,
                    date: $date,
                    type: $type
                })
                CREATE (a)-[:HAS_TRANSACTION]->(t)
                
                WITH t, $category as category_name, $merchant as merchant_name
                MERGE (c:Category {name: category_name})
                CREATE (t)-[:IN_CATEGORY]->(c)
                
                WITH t, merchant_name
                MERGE (m:Merchant {name: merchant_name})
                CREATE (t)-[:TO_MERCHANT]->(m)
                
                RETURN t, c, m
                """,
                user_id=user_id,
                transaction_id=transaction_id,
                description=description,
                amount=amount,
                date=date,
                type=transaction_type,
                category=category,
                merchant=merchant
            )
            
            record = result.single()
            if record:
                t = dict(record["t"])
                c = dict(record["c"]) if record["c"] else None
                m = dict(record["m"]) if record["m"] else None
                
                return {
                    "success": True,
                    "transaction": {
                        "id": t.get("id"),
                        "amount": t.get("amount"),
                        "description": t.get("description"),
                        "date": str(t.get("date")),
                        "type": t.get("type"),
                        "category": c.get("name") if c else None,
                        "merchant": m.get("name") if m else None
                    }
                }
            else:
                return {
                    "success": False,
                    "error": "User or account not found"
                }
                
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
