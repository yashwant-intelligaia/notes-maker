// import mongoose from "mongoose";
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: { type: String },
    password: { type: String },
    age: { type: Number },
    date: { type: Date, default: Date.now }
});

// export const User = mongoose.model("users", UserSchema);
module.exports = User = mongoose.model("users", UserSchema);