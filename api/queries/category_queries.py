def get_all_categories(driver):
    with driver.session() as session:
        result = session.run(
            "MATCH (c:Category) RETURN c ORDER BY c.name"
        )
        return [dict(record["c"]) for record in result]


def get_all_merchants(driver):
    with driver.session() as session:
        result = session.run(
            "MATCH (m:Merchant) RETURN m ORDER BY m.name"
        )
        return [dict(record["m"]) for record in result]
