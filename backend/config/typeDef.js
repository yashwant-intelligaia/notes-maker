// import { gql } from "apollo-server-koa";
const {gql} = require('apollo-server-koa');
// export const typeDefs = gql`
module.exports = typeDefs = gql`
  type Error{ field: String, message: String! }

  #User section
  type User{ _id: ID!, username: String!, age: Int }
  type RegisterUser{ status: Int, errors: [Error], user: User }

  input UserInfo{ _id: String, username: String!, password: String!, age: Int }
  input UserInput{ username: String! }
  
  #Notes section
  type Note{ _id: ID!, title: String!, content:String }
  type RegisterNote{ status: Int, errors: [Error], note: Note! }
  input NoteInfo{ _id:String!, title:String }
  input NoteInput{ _id:String, title:String! }
  input UpdateNoteInput{ _id:String!, title: String!, content: String!}

  #Content section
  type Content{ _id: ID!, note_id:String, data: String}
  type RegisterContent{ status: Int, errors: [Error], content: Content! }
  input ContentInfo{ _id:String, note_id:String!, data: String! }

  #Query & Mutation section
  type Query { 
    user(userInput:UserInput): User!, 
    users: [User],
    note(noteInfo:NoteInfo): Note!,
    notes:[Note]
  }

  type Mutation{
    register(userInfo:UserInfo): RegisterUser,
    login(userInfo:UserInfo):RegisterUser,
    create_note(noteInput:NoteInput):RegisterNote,
    update_note(updateNoteInput:UpdateNoteInput):RegisterNote,
    add_update_note_content(contentInfo: ContentInfo): RegisterContent,
  }
`;