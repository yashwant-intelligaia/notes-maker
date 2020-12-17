import { gql } from '@apollo/client';
export const CREATE_NOTE = gql`
    mutation createNote($title: String!){
        create_note(noteInfo:{title:$title}){
            status
            errors{
                message
            }
            note{
                title
                _id
            }
        }
    }
`;

export const UPDATE_NOTE = gql`
    mutation updateNote($_id:String!, $title:String!, $content: String!){
        update_note(updateNoteInput:{_id:$_id, title:$title, content:$content}){
            status
            errors{
                message
            }
        }
    }
`;