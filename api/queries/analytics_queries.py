def get_spending_by_category(driver, user_id: int):
    with driver.session() as session:
        result = session.run(
            """
            MATCH (u:User {id: $id})-[:OWNS]->(:Account)-[:HAS_TRANSACTION]->(t)
            MATCH (t)-[:IN_CATEGORY]->(c)
            WHERE t.amount < 0
            RETURN c.name AS category, SUM(ABS(t.amount)) AS spent
            ORDER BY spent DESC
            """,
            id=user_id
        )

        return [{"category": r["category"], "spent": r["spent"]} for r in result]
