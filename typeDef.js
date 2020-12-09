import { gql } from "apollo-server-koa";

export const typeDefs = gql`
  type Query {
    hello(name:String): String
    user(userInput:UserInput): User!
    users: [User]
  }

  type Error{
    field: String!
    message: String!
  }

  type RegisterUser{
    errors: [Error],
    user: User
  }

  type User{
    _id: ID!
    username: String!
    age: Int
    firstLetter: String!
  }

  type Mutation{
    register(userInfo:UserInfo): RegisterUser
    login(userInfo:UserInfo):String!
  }

  input UserInfo{
    _id: String
    username: String!
    password: String!
    age: Int
  }

  input UserInput{
    username: String!
  }
`;