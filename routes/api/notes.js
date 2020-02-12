const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const db = require('../../db/Db');

// Gets all text in db json file
router.get('/', (req, res) => res.json(db));

// Get single text by Id
router.get('/:id', (req, res) => {
    const found = db.some(db => db.id === parseInt(req.params.id));

    if (found) {
        res.json(db.filter(db => db.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ msg: `No text was found on ${req.params.id} ` });
    }
});

// Create an input
router.post('/', (req, res) => {
    const newDB = {
        id: uuid.v4(),
        title: req.body.title,
        text: req.body.text
    };
    //User must enter both tittle and text, if not the program will throw an error
    if (!newDB.title || !newDB.text) return res.status(400).json({ msg: 'Please fill in Title and Body Text' });

    db.push(newDB);
    res.json(db);

});

// Update input
router.put('/:id', (req, res) => {
    const found = db.some(db => db.id === parseInt(req.params.id));

    if (found) {
        const updatedb = req.body;
        db.forEach()(db => {
            if (db.id == parseInt(req.params.id)) {
                db.title = updatedb.title ? updatedb.title : db.title;
                db.text = updatedb.text ? updatedb.text : db.text;

                res.json({ msg: 'Information updated', db });
            }
        });
    } else {
        res.status(400).json({ msg: `No tittle/ text with the id of ${req.params.id}` });
    }
});

// Delete input
router.delete('/:id', (req, res) => {
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


module.exports = router;