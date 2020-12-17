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