import mongoose from "mongoose";

const Schema = mongoose.Schema;
const NoteSchema = new Schema({
    title: {type: String},
    content: {type: String},
    date: {type: Date, default:Date.now}
});

export const Note = mongoose.model("notes", NoteSchema);