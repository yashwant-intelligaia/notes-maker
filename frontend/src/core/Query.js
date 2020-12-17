import { gql } from '@apollo/client';
export const GET_NOTES = gql`
  query notes{
    notes{
      _id
      title
    }
  }
`;