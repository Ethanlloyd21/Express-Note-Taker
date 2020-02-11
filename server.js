const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');
const writeFiles = util.promisify(fs.writeFile);
const app = express();



app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'notes.html'));
})

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'index.html'));
})
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));