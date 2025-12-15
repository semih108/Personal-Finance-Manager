Personal Finance Manager - Development Documentation

1. Initial Concept and Objectives

The Personal Finance Manager application tracks financial activities through a graph-based data model. The system enables users to manage accounts, record transactions, and analyze spending patterns through category-based breakdowns and visualizations.

2. Technology and Architecture Decisions

Neo4j and FastAPI were specified course requirements. React with Vite was chosen for the frontend to provide a responsive single-page application with component-based architecture and fast development workflow. A REST-based architecture maintains clear separation between frontend and backend layers, simplifying development and enabling independent modification of either layer.

3. Graph Data Modeling

The model consists of five node types: User, Account, Transaction, Category, and Merchant. Relationships follow a clear hierarchy: Users own Accounts (OWNS), Accounts contain Transactions (HAS_TRANSACTION), and Transactions connect to Categories (IN_CATEGORY) and Merchants (TO_MERCHANT). This structure allows natural traversal for queries like finding all food expenses across a user's accounts. The graph model suits this domain because financial analysis requires following multiple relationship paths efficiently.

4. Implementation Process

Development followed a layered approach: database schema, backend API with separated query modules, and frontend integration. Query functions abstract Cypher operations into Python, returning standardized data structures. Frontend components use Axios for API calls with simple state management via React hooks. Focus remained on functional completeness over visual design.

5. Challenges and Insights

The main challenge involved structuring Cypher queries for efficient data retrieval. Understanding MATCH versus MERGE operations and handling optional relationships required careful study. SSL certificate configuration for Neo4j Aura posed initial connection issues requiring custom SSL contexts. A key insight was recognizing relationships as first-class citizens—moving category data from transaction properties to separate connected nodes improved flexibility. The graph approach excels for interconnected data but requires thoughtful schema design to leverage traversal capabilities effectively.
