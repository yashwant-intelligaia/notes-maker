import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ContentSchema = new Schema({
    note_id: {type: String},
    data: {type: String},
    date: {type: Date, default:Date.now}
});

export const Content = mongoose.model("contents", ContentSchema);