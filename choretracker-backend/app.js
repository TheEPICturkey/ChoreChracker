const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 5000;

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

app.post('/createUser', (req, res) => {
    const { identifier, userType, code } = req.body;

    const query = 'INSERT INTO Users (identifier, userType, code) VALUES (?, ?, ?)';
    db.query(query, [identifier, userType, code], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// app.post('/assignChore', (req, res) => {
//     console.log('Assign Chore endpoint hit!');
//     const { title, description, assignedTo, createdBy } = req.body;

//     const query = 'INSERT INTO Chores (title, description, assignedTo, createdBy) VALUES (?, ?, ?, ?)';

//     db.query(query, [title, description, assignedTo, createdBy], (err, result) => {
//         if (err) {
//             console.error('Database error:', err);
//             return res.status(500).send({ error: 'Database operation failed' });
//         }
//         res.send(result);
//     });
// });

app.post('/assignChore', (req, res) => {
    console.log('Payload received:', req.body);
    const { title, description, assignedTo, createdBy } = req.body;

    // Validate createdBy field
    if (typeof createdBy !== 'number' || !createdBy) {
        return res.status(400).json({ error: "createdBy field is required and must be a number" });
    }

    const query = 'INSERT INTO Chores (title, description, assignedTo, createdBy) VALUES (?, ?, ?, ?)';
    db.query(query, [title, description, assignedTo, createdBy], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send({ error: `Database operation failed: ${err.message}` });
        }
        res.send(result);
    });
});

app.put('/completeChore/:id', (req, res) => {
    const choreId = req.params.id;

    const query = 'UPDATE Chores SET status = ? WHERE id = ?';
    db.query(query, ['completed', choreId], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.put('/verifyChore/:id', (req, res) => {
    const choreId = req.params.id;

    const query = 'UPDATE Chores SET status = ? WHERE id = ?';
    db.query(query, ['verified', choreId], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.get('/chores', (req, res) => {
    const query = 'SELECT * FROM Chores';
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send({ error: 'Database operation failed' });
        } else {
            res.send(results);
        }
    });
});

app.get('/chore/:id', (req, res) => {
    const choreId = req.params.id;
    const query = 'SELECT * FROM Chores WHERE id = ?';
    db.query(query, [choreId], (err, results) => {
        if (err) {
            res.status(500).send({ error: 'Database operation failed' });
        } else {
            res.send(results[0]);
        }
    });
});

app.get('/users', (req, res) => {
    const query = 'SELECT * FROM Users';
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send({ error: 'Database operation failed' });
        } else {
            res.send(results);
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});