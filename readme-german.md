
# Personal Finance Manager

Eine Full-Stack-Anwendung zur Verwaltung persönlicher Finanzen mit React, FastAPI und einer Neo4j-Graphdatenbank.

---

## Projektstruktur

```text
Personal-Finance-Manager/
├── api/                        # Backend (FastAPI + Neo4j)
│   ├── queries/
│   │   ├── analytics_queries.py
│   │   ├── category_queries.py
│   │   ├── transaction_queries.py
│   │   └── user_queries.py
│   ├── main.py
│   ├── neo4j_driver.py
│   └── requirements.txt
│
├── frontend/                   # Frontend (React + Vite)
│   ├── src/
│   │   ├── Components/
│   │   ├── Contexts/
│   │   ├── Hooks/
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
````

---

## Funktionen

* **Transaktionsverwaltung**: Einnahmen und Ausgaben erfassen, anzeigen und nachverfolgen
* **Ausgabenanalyse**: Visuelle Aufschlüsselung der Ausgaben nach Kategorien
* **Benutzerprofile**: Anzeige von Benutzerinformationen und Kontoständen
* **Budgetplanung**: Budgets planen und überwachen
* **Prognosen**: Vorhersage zukünftiger Ausgaben auf Basis historischer Daten
* **Echtzeit-Diagramme**: Interaktive Diagramme mit Chart.js

---

## Technologie-Stack

### Backend

* **FastAPI** – Python-Webframework
* **Neo4j** – Graphdatenbank
* **Python 3.13**
* **Pydantic** – Datenvalidierung

### Frontend

* **React 18**
* **Vite**
* **Bootstrap 5**
* **Chart.js**
* **Axios**

---

## Voraussetzungen

* Python 3.13+
* Node.js 16+
* Neo4j Aura Account oder lokale Neo4j-Instanz

---

## Installation

### Backend Setup

1. In das Backend-Verzeichnis wechseln:

```bash
cd api
```

2. Abhängigkeiten installieren:

```bash
pip install -r requirements.txt
```

3. Neo4j-Verbindung in `neo4j_driver.py` konfigurieren:

* `URI` setzen
* `USER` setzen
* `PASSWORD` setzen

4. Backend-Server starten:

```bash
uvicorn main:app --reload
```

Backend läuft unter:

```
http://127.0.0.1:8000
```

---

### Frontend Setup

1. In das Frontend-Verzeichnis wechseln:

```bash
cd frontend
```

2. Abhängigkeiten installieren:

```bash
npm install
```

3. Entwicklungsserver starten:

```bash
npm run dev
```

Frontend läuft unter:

```
http://localhost:5173
```

---

## API-Endpunkte

### Benutzer

* `GET /user/{user_id}` – Benutzerprofil und Konten abrufen

### Transaktionen

* `GET /transactions/{user_id}` – Alle Transaktionen eines Benutzers abrufen
* `POST /transactions` – Transaktion erstellen

### Kategorien

* `GET /categories` – Alle Kategorien abrufen


---

## Datenbankschema

### Knoten

* `User`
* `Account`
* `Transaction`
* `Category`
* `Merchant`

### Beziehungen

* `(:User)-[:OWNS]->(:Account)`
* `(:Account)-[:HAS_TRANSACTION]->(:Transaction)`
* `(:Transaction)-[:IN_CATEGORY]->(:Category)`
* `(:Transaction)-[:TO_MERCHANT]->(:Merchant)`

--------

## **Datenbankschema – Graph-Struktur**

### **Knoten (Entitäten)**

**User**
- Repräsentiert einen Systembenutzer
- Eigenschaften: `id`, `name`, `email`
- Ausgangspunkt der Besitz-Hierarchie

**Account**
- Finanzkonten (Girokonto, Sparkonto, Kreditkarte)
- Eigenschaften: `name`, `balance`
- Gehört einem Benutzer

**Transaction**
- Einzelne finanzielle Aktivität
- Eigenschaften: `id`, `amount`, `description`, `date`, `type`
- Negativer Betrag = Ausgabe, positiver Betrag = Einnahme

**Category**
- Klassifizierung von Ausgaben/Einnahmen
- Eigenschaften: `name`
- Beispiele: Food, Rent, Transport, Salary

**Merchant**
- Händler oder Dienstleister
- Eigenschaften: `name`
- Beispiele: Supermarkt, Restaurant, Arbeitgeber

---

### **Beziehungen (Verknüpfungen)**

**(:User)-[:OWNS]→(:Account)**
- Ein Benutzer besitzt mehrere Konten
- 1-zu-n-Beziehung
- Definiert die Kontozugehörigkeit

**(:Account)-[:HAS_TRANSACTION]→(:Transaction)**
- Ein Konto enthält Transaktionen
- Abbildung der Transaktionshistorie
- Nachvollziehbarkeit des Geldflusses

**(:Transaction)-[:IN_CATEGORY]→(:Category)**
- Ordnet Transaktionen Kategorien zu
- Grundlage für Auswertungen nach Kategorie
- Beantwortet Fragen wie:  
  „Wie viel wurde für Essen ausgegeben?“

**(:Transaction)-[:TO_MERCHANT]→(:Merchant)**
- Verknüpft eine Transaktion mit einem Händler
- Zeigt, wohin das Geld geflossen ist
- Optionale Beziehung

**(:Merchant)-[:BELONGS_TO_CATEGORY]→(:Category)**
- Semantische Zuordnung
- Klassifizierung des Händlers
- Beispiel: Supermarkt → Food

---


### **Beispielabfrage**

```cypher
// Alle Food-Ausgaben für User 1 finden
MATCH (u:User {id:1})-[:OWNS]->()-[:HAS_TRANSACTION]->(t)-[:IN_CATEGORY]->(c:Category {name:"Food"})
RETURN t





## Lizenz

Dieses Projekt wurde zu Ausbildungs- und Lernzwecken erstellt.

```
```
