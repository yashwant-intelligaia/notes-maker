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
        user: () => ({ _id: 1, username: "yashwant" }),
        // users: () => ([{ _id: 1, username: "yashwant" }, { _id: 2, username: "bhanu" }]),
        users:() =>{
            var user = User.find();
            return user;
        }
    },
    Mutation: {
        login: (parent, { userInfo: { username } }, context, info) => {
            return username;
        },
        // register: () => ({ errors: [{ field: "username", message: "invalid" }], user: { id: 1, username: "tom" } }),
        register: async (parent, {userInfo}, context, info) =>{
            // console.log(userInfo);
            var user = new User(userInfo);
            var response = await user.save();
            console.log('response',response);
            return {errors: [{ field: "username", message: "invalid" }], user: user }
            // return user.username;
        }
    }
}