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

const updateNote = async (req, res) => {
    try {
        // check whether the user updating the note is valid user on not
        console.log(req.params.id);
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(401).send("Not Found");
        }

        console.log(note.user);
        if (note.user.toString() !== req._id) {
            return res.status(401).send("Invalid User");
        }
        const { title, description, tag } = req.body;
        const newNote = {
            title,
            description,
            tag
        };

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        return res.status(200).send(note);
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
}

const deleteNote = async (req, res) => {
    try {
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(401).send("Not Found");
        }

        if (note.user.toString() !== req._id) {
            return res.status(401).send("Invalid User");
        }

        note = await Note.findByIdAndDelete(req.params.id);

        return res.status(200).send("User Deleted Successfully");
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
}

module.exports = { addNote, getAllNotes, updateNote, deleteNote }