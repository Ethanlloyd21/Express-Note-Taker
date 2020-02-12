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

// Create db
router.post('/', (req, res) => {
    res.send(req.body);

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


module.exports = router;