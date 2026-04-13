export const getAllNotes = (req, res) => {
    res.status(200).json({ message: "You have 5 notes" });
};

export const createNote = (req, res) => {
    res.status(201).json({ message: "Note created successfully" });
};

export const updateNote = (req, res) => {
    res.status(200).json({ message: `Note with id ${req.params.id} updated successfully` });
};

export const deleteNote = (req, res) => {
    res.status(200).json({ message: `Note with id ${req.params.id} deleted successfully` });
}
