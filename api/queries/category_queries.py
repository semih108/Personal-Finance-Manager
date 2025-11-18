def get_all_categories(driver):
    with driver.session() as session:
        result = session.run(
            "MATCH (c:Category) RETURN c ORDER BY c.name"
        )
        return [record["c"].properties for record in result]
