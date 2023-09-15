const express = require('express');
const required = require('../middleware/required');
const noteController = require('../controllers/NoteController')
const router = express.Router();

router.post('/addnote', required, noteController.addNote);
router.get('/getAllNotes', required, noteController.getAllNotes);
router.put('/updateNote/:id', required, noteController.updateNote);
router.delete('/deleteNote/:id', required, noteController.deleteNote);

module.exports = router;