import { UserController } from './controller/UserController.js';
import { AuthController } from './controller/AuthController.js';
import { NotesController } from './controller/NotesController.js';
var userController = new UserController();
var authController = new AuthController();
var notesController = new NotesController();

export const resolvers = {
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
        create_note: async (parent, { noteInfo }, context, info) => {
            return await notesController.createNote(noteInfo);
        },
        add_update_note_content: async (parent, { contentInfo }, context, info) => {
            return await notesController.addOrUpdateContent(contentInfo);
        }
    }
}