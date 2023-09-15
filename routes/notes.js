const express = require('express');
const required = require('../middleware/required');
const noteController = require('../controllers/NoteController')
const router = express.Router();

router.post('/addnote', required, noteController.addNote);
router.get('/getAllNotes', required, noteController.getAllNotes);

module.exports = router;