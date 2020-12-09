import { User } from './model/User.js';
export const resolvers = {
    User: {
        username: parent => {
            return parent.username
        },
        firstLetter: parent => {
            return parent.username[0]
        }
    },
    Query: {
        hello: (parent, { name }) => { return `hello ${name}` },

        user: async (parent, { userInput }) => {
            var user = await User.findOne({ username: userInput.username });
            return user;
        },
        users: () => {
            var user = User.find();
            return user;
        }
    },
    Mutation: {
        login: (parent, { userInfo: { username } }, context, info) => {
            return username;
        },

        register: async (parent, { userInfo }, context, info) => {
            var user = new User(userInfo);
            await user.save();
            return { errors: [{ field: "username", message: "invalid" }], user: user };
        }
    }
}