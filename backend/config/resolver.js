// import { UserController } from '../app/controller/UserController.js';
// import { AuthController } from '../app/controller/AuthController.js';
// import { NotesController } from '../app/controller/NotesController.js';
const UserController  = require('../app/controller/UserController');
const AuthController  = require('../app/controller/AuthController');
const NotesController  = require('../app/controller/NotesController');
var userController = new UserController();
var authController = new AuthController();
var notesController = new NotesController();

module.exports = resolver = {
// export const resolvers = {
    User: {
        username: parent => {
            return parent.username
        }
    },
    Query: {
        user: async (parent, { userInput }) => {
            return await userController.getUser(userInput);
        },
        users: async () => {
            return await userController.getUsers();
        },
        note: async (parent, { noteInfo }) => {
            return await notesController.getNote(noteInfo);
        },
        notes: async () => {
            return await notesController.getNotes();
        }
    },
    Mutation: {
        login: async (parent, { userInfo: { username, password } }, context, info) => {
            return await authController.login(username, password);
        },
        register: async (parent, { userInfo }, context, info) => {
            return await authController.register(userInfo);
        },
        create_note: async (parent, { noteInput }, context, info) => {
            return await notesController.createNote(noteInput);
        },
        update_note: async (parent, { updateNoteInput }, context, info) => {
            return await notesController.updateNote(updateNoteInput);
        },
        add_update_note_content: async (parent, { contentInfo }, context, info) => {
            return await notesController.addOrUpdateContent(contentInfo);
        }
    }
}