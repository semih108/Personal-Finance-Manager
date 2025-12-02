def get_all_categories(driver):
    with driver.session() as session:
        result = session.run(
            "MATCH (c:Category) RETURN c ORDER BY c.name"
        )
        return [dict(record["c"]) for record in result]
