const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'epicodus',
    database: 'choretracker'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Database');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});