// simple Express app that connects to MySQL (for assignment demonstration)
const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
app.use(express.json());

const DB_HOST = process.env.DB_HOST || 'db';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASS = process.env.DB_PASS || 'secret';
const DB_NAME = process.env.DB_NAME || 'appdb';
const PORT = process.env.PORT || 3000;

async function getConnection() {
  return mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME
  });
}

// simple endpoint
app.get('/', (req, res) => {
  res.send('Hello — this is the containerized app (Node + MySQL).');
});

// a small DB test endpoint: creates table (if not exists) and inserts timestamp
app.get('/dbtest', async (req, res) => {
  try {
    const conn = await getConnection();
    await conn.execute(`CREATE TABLE IF NOT EXISTS hits (
      id INT AUTO_INCREMENT PRIMARY KEY,
      ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);
    await conn.execute('INSERT INTO hits () VALUES ()');
    const [rows] = await conn.execute('SELECT COUNT(*) as cnt FROM hits');
    await conn.end();
    res.json({ success: true, hits: rows[0].cnt });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => console.log(`App listening on ${PORT}`));
