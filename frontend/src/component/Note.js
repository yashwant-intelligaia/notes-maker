import { useParams } from 'react-router-dom';
import { ApolloClient, InMemoryCache, useQuery, gql } from '@apollo/client';

const GET_NOTES = gql`
  query getNote($title: String!) {
    note(noteInfo: {title: $title}) {
      _id
      title
    }
  }
`;

const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
    cache: new InMemoryCache()
});

function Note() {
    const { title } = useParams();
    const { loading, error, data } = useQuery(GET_NOTES, {
        client: client,
        variables: { title: title }
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    return <h1>Note - {data.note.title}</h1>
}

export default Note;