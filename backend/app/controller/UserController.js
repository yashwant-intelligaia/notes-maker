// import { User } from '../model/User.js';
const User = require('../model/User');

module.exports = class UserController{
// export class UserController{
    constructor(){}

    /**
     * Function to get all users list
     */
    async getUsers(){
        return await User.find();
    }

    /**
     * 
     * @param {*} params 
     */
    async getUser(params){
        let user = await User.findOne({ username: params.username });
        if(user){ return user }
        else{
            let errors = [{ field: "username", message: "Incorrect Password." }];
            return { status: (!user?404:200), errors: (!user?errors:[]), user: user };
        }
    }
}