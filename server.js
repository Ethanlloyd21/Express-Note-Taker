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


//app.use(express.static(path.join(__dirname, 'public')));

app.get('/notes/css', (req, res) => res.sendFile(path.join(__dirname, './public/assets/css/style.css')));

app.get('/notes/js', (req, res) => res.sendFile(path.join(__dirname, './public/assets/js/index.js')));



// Get routes for notes.html
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public', 'notes.html')));
// Get routes for index.html
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

/*
// Gets all text in db json file
app.get('/api/notes', (req, res) => res.json(db));

// Get single text by Id
app.get('api/notes/:id', (req, res) => {
    const found = db.some(db => db.id === parseInt(req.params.id));

    if (found) {
        res.json(db.filter(db => db.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ msg: `No text was found on ${req.params.id} `});
    }     
});
*/

// notes API routes
app.use('/api/notes', require('./routes/api/notes'));

/*
// Recive a new note to save on the request body, add it to db file then return the new note to the client. 
router.post('/api/notes', (req, res) => {
    const newDB = {
        id: uuid.v4(),
        title: req.body.name,
        text: req.body.text
    };
    //User must enter both tittle and text, if not the program will throw an error
    if (!newDB.name || !newDB.text) return res.status(400).json({ msg: 'Please type a tittle and a text' });

    db.push(newDB);
    res.json(db);

});

// Update db
router.put('/api/notes:id', (req, res) => {
    const found = db.some(db => db.id === parseInt(req.params.id));

    if (found) {
        const updatedb = req.body;
        db.forEach()(db => {
            if (db.id == parseInt(req.db.id)) {
                db.tittle = updatedb.titte ? updatedb.title : db.name;
                db.text = updatedb.text ? updatedb.text : db.text;

                res.json({ msg: 'db updated', db });
            }
        });
    } else {
        res.status(400).json({ msg: `No tittle/ text with the id of ${req.params.id}` });
    }
});

// Delete db
router.delete('/api/notes:id', (req, res) => {
    const found = db.some(db => db.id === parseInt(req.params.id));

    if (found) {
        res.json({
            msg: 'Text deleted',
            db: db.filter(db => db.id !== parseInt(req.params.id))
        });
    } else {
        res.status(400).json({ msg: `Nothing was found ${req.params.id}` });
    }
});
*/

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));