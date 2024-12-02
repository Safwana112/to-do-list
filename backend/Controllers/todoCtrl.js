
const Todo = require("../Model/todo");


const createToDo = async (req, res) => {
    const { message } = req.body;

    if (req.body.message === "") {
        return res.status(401).json({ errorMessage: "message cannot be empty" });
    }


    // validation: check if message is empty or  does not meet the length requirements
    if (!message || message.length < 4 || message.length > 20) {
        return res
            .status(400)
            .json({ errorMessage: "message must be between 4 and 20 characters." });
    }
    try {
        const addToDo = await Todo.create({ message });
        res.status(200).json({ success: "created", data: addToDo });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal server error" });
    }
};

const getAllToDo = async (req, res) => {
    try {
        const getToDo = await Todo.find({});
        res.status(200).json({ data: getToDo });
    } catch (error) {
        console.log(error);
    }
};

// when you see an empty{} object passed to the .find() method, it means that the function is requesting all the  documents from the collection.

const deletToDO = async (req, res) => {
    try {
        const deleted = await Todo.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: "deleted" });
    } catch (error) {
        console.log(error);
    }
};

// findByIdAndDelete(): this is a mongoose method that performs two actions in one step:
// find a document bt its _id field.
// delete that document from the collections

// req.params.id refers to the ID of the ToDo itrm that you want to delete, which is passed in the URL, for eg, if the route is /delete/:id, req.params.id will contain the value pf thet id.

// a client makes a request to an endpoint like:
// DELET/todo/12345abcdef
// where 12345abcdef is the ID of the ToDo item to be deleted.

// Rout Handler:
// the ID (12345abcdef) gets asssigned to req.params.id

// Mongoose Operation:
// findByIdAndDelete(req.params.id) runs and looks for the document with _id: 12345abcdef in the mongoDB colllection.

// Deletion Outcome:
// if found, the document is deleted and returned to the deleted vaiable.
// if not found, deleted will be null.

const updateToDo = async (req, res) => {
    try {
        const updatedToDo = await Todo.findByIdAndUpdate(
            req.params.id,

            {
                message: req.body.message,
            },
            { new: true }

        );
        if (updatedToDo) {
            res.json({ success: "updated", data: updatedToDo });
        } else {
            res.status(404).json({ error: "Todo not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
//{new:true}:this option tells mongoose to return the updated document instead of the old one. without{new:true},mongoose would return the document as it was before the update
module.exports = {
    createToDo,
    getAllToDo,
    updateToDo,
    deletToDO,
};