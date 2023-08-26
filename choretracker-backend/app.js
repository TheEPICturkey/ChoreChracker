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

// Create a new user
app.post('/createUser', (req, res) => {
    const { identifier, userType, code } = req.body;

    const query = 'INSERT INTO Users (identifier, userType, code) VALUES (?, ?, ?)';
    db.query(query, [identifier, userType, code], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Assign a chore
app.post('/assignChore', (req, res) => {
    const { title, description, assignedTo, createdBy } = req.body;

    const query = 'INSERT INTO Chores (title, description, assignedTo, createdBy) VALUES (?, ?, ?, ?)';
    db.query(query, [title, description, assignedTo, createdBy], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Mark a chore as completed
app.put('/completeChore/:id', (req, res) => {
    const choreId = req.params.id;

    const query = 'UPDATE Chores SET status = ? WHERE id = ?';
    db.query(query, ['completed', choreId], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Verify a completed chore
app.put('/verifyChore/:id', (req, res) => {
    const choreId = req.params.id;

    const query = 'UPDATE Chores SET status = ? WHERE id = ?';
    db.query(query, ['verified', choreId], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});
