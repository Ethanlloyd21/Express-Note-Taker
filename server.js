const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');
const uuid = require('uuid');
const writeFiles = util.promisify(fs.writeFile);
const db = require('./db/Db');
const router = express.Router();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/notes/css', (req, res) => res.sendFile(path.join(__dirname, './public/assets/css/style.css')));

app.get('/notes/js', (req, res) => res.sendFile(path.join(__dirname, './public/assets/js/index.js')));

// Get routes for notes.html
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public', 'notes.html')));
// Get routes for index.html
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

// notes API routes
app.use('/api/notes', require('./routes/api/notes'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
