const Note = require('../models/NoteSchema');
const User = require('../models/UserSchema');

const addNote = async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        if (!title || !description) {
            return res.status(400).send("title and description are required");
        }

        const owner = req._id;
        const note = new Note({
            user: owner,
            title,
            description,
            tag
        });
        const savedNote = await note.save();

        return res.status(200).send(savedNote);
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
}

const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find({ user: req._id });
        return res.send(notes);
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
}

module.exports = { addNote, getAllNotes }