from neo4j import GraphDatabase
import ssl

URI = "neo4j://b53a7730.databases.neo4j.io"
USER = "neo4j"
PASSWORD = "wMNJJHBL_DahqeItqA0SrgVoUCN-6jxekWh9JVHXsRY"

# Create SSL context that doesn't verify certificates
ssl_context = ssl.create_default_context()
ssl_context.check_hostname = False
ssl_context.verify_mode = ssl.CERT_NONE

driver = GraphDatabase.driver(
    URI, 
    auth=(USER, PASSWORD),
    encrypted=True,
    ssl_context=ssl_context
)


def get_db():
    return driver