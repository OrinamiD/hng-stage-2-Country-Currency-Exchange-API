# 🌍 Country Currency & Exchange API

A RESTful API that fetches country data from an external API, stores it in PostgreSQL, and provides CRUD operations on the data.  
This project is built with **Node.js**, **Express**, **TypeScript**, and **PostgreSQL**, and hosted on **Railway**.

---

## 🚀 Features

- Fetches country data from [REST Countries API](https://restcountries.com/v2/all?fields=name,capital,region,population,flag,currencies)
- Extracts key details such as:
  - Country name
  - Capital
  - Region
  - Population
  - Currency code
  - Exchange rate (from an external exchange API)
  - Estimated GDP
  - Flag URL
- Stores the data in PostgreSQL
- Supports CRUD operations
- Automatically creates tables (`countries` and `metadata`) on startup

---

## 🧩 Tech Stack

- **Backend:** Node.js + Express + TypeScript  
- **Database:** PostgreSQL  
- **Hosting:** Railway  
- **API Calls:** Axios  

---

## 📦 Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/OrinamiD/hng-stage-2-Country-Currency-Exchange-API.git 
cd hng-stage2
2️⃣ Install dependencies
bash
Copy code
npm install
3️⃣ Create a .env file
In the project root, create a .env file and add your environment variables:

env
Copy code
PORT=5000
DATABASE_URL=postgresql://postgres:YhUoitmUiKBoRYGxKaGimpMTNXUNIPzE@tramway.proxy.rlwy.net:39580/railway
EXCHANGE_API_KEY=https://restcountries.com/v2/all?fields=name,capital,region,population,flag,currencies

Example:

bash
Copy code
postgresql://postgres:password@containers-us-west-42.railway.app:6543/railway
🛠️ Build and Run
Run in development mode
bash
Copy code
npm run dev
Build the project
bash
Copy code
npm run build
Start the server (production mode)
bash
Copy code
npm start
When successful, you should see:

pgsql
Copy code
✅ Connected to PostgreSQL successfully
✅ Tables are ready (countries + metadata)
Server running on PORT 5000
🧱 Database Setup
Tables are automatically created at startup:

countries Table
Column	Type	Description
id	SERIAL PRIMARY KEY	Auto-generated ID
name	VARCHAR(255)	Country name
capital	VARCHAR(255)	Capital city
region	VARCHAR(255)	Continent/region
population	BIGINT	Population count
currency_code	VARCHAR(16)	ISO currency code
exchange_rate	DOUBLE PRECISION	Rate to USD
estimated_gdp	DOUBLE PRECISION	Calculated GDP estimate
flag_url	VARCHAR(1024)	Country flag image URL
last_refreshed_at	TIMESTAMP	Last updated time

metadata Table
Column	Type	Description
key	VARCHAR(100) PRIMARY KEY	Metadata key
value	TEXT	Metadata value

🔗 API Endpoints
Method	Endpoint	Description
GET	/api/countries	Fetch all countries
GET	/api/countries/:id	Get a single country by ID
POST	/api/countries	Add a new country
PUT	/api/countries/:id	Update an existing country
DELETE	/api/countries/:id	Delete a country

⚙️ Folder Structure
pgsql
Copy code
src/
├── configs/
│   └── db.configs.ts       # Database configuration
├── controllers/
│   └── country.controller.ts
├── routes/
│   └── country.routes.ts
├── services/
│   └── country.service.ts
├── setupTables.ts          # Creates tables automatically
└── index.ts                # Entry point
🌐 Deployment
Push your code to GitHub.

Connect your GitHub repo to Railway.app.

Add your environment variables (DATABASE_URL, PORT, etc.) in Railway.

Deploy your project — Railway will handle hosting both the backend and the database.

👨‍💻 Author
Dongo Orinami Cornelius

🧠 Virtual Assistant | Data Analyst | Backend Developer

💼 LinkedIn

🐙 GitHub

🏁 License
This project is open-source and available under the MIT License.

✅ Example Output
When you start the server:

pgsql
Copy code
✅ Connected to PostgreSQL successfully
✅ Tables are ready (countries + metadata)
Server running on PORT 5000
yaml
Copy code

---

Would you like me to include **setup instructions for local PostgreSQL** (for development before deploy
