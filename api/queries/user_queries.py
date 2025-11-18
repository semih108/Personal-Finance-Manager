def get_user_overview(driver, user_id):
    try:
        with driver.session() as session:
            result = session.run(
                """
                MATCH (u:User {id: $id})
                OPTIONAL MATCH (u)-[:OWNS]->(a:Account)
                RETURN u, collect(a) AS accounts
                """,
                id=user_id
            )

            record = result.single()
            if not record or not record["u"]:
                return {"error": f"User {user_id} not found"}

            user = dict(record["u"])
            accounts = [dict(a) for a in record["accounts"] if a is not None]

            return {
                "user": user,
                "accounts": accounts
            }
    except Exception as e:
        return {"error": str(e), "type": type(e).__name__}
