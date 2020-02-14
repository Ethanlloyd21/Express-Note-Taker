const express = require('express');
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

    let idCount = (db.length + 1);

    const newDB = {
        id: idCount,
        title: req.body.title,
        text: req.body.text
    };
    db.push(newDB);
    res.json(db);

});


// Delete input
router.delete('/:id', (req, res) => {

    let id = parseInt(req.params.id);
    for (let i = 0; i < db.length; ++i) {
        const placement = db[i];
        if (id === placement.id) {
            db.splice(i, 1);
            break;
        }
    }
    res.json(db);

});

module.exports = router;
