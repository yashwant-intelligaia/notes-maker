import { gql } from '@apollo/client';
export const GET_NOTES = gql`
  query notes{
    notes{
      _id
      title
    }
  }
`;

export const GET_NOTE_INFO = gql`
  query getNote($_id: String!) {
    note(noteInfo: {_id: $_id}) {
      _id
      title
      content
    }
  }
`;