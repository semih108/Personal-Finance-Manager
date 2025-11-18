from neo4j import Record

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
            t = record["t"].properties
            m = record["m"].properties if record["m"] else None
            c = record["c"].properties if record["c"] else None

            transactions.append({
                "id": t.get("id"),
                "amount": t.get("amount"),
                "description": t.get("description"),
                "date": str(t.get("date")),
                "merchant": m.get("name") if m else None,
                "category": c.get("name") if c else None
            })

        return transactions
