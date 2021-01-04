
const User = require('../model/User');

module.exports = class AuthController{
// export class AuthController {
    constructor() { }

    /**
     * Function to authenticate user
     * @param {*} username 
     * @param {*} password 
     */
    async login(username, password) {
        let userExist = await User.findOne({ username: username });
        let user = await User.findOne({ username: username, password: password });
        let errors = [{ field: (userExist ? "password" : "username"), message: (userExist ? "Incorrect Password." : "User not exist.") }];
        return { status: (!user?404:200), errors: (!user?errors:[]), user: user };
    }

    /**
     * Function to register user
     * @param {*} params(username, password, age)
     */
    async register(params) {
        let user = await User.findOne({ username: params.username });
        if (user) { return { status: 200, errors: [{ field: "username", message: "Username already exist." }], user: null } }
        else {
            user = new User(params);
            await user.save();
            return { status: 201, errors: [], user: user }
        }
    }
}