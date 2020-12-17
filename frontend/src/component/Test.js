import { React } from 'react';
import { ApolloClient, InMemoryCache, useQuery, useMutation, gql } from '@apollo/client';
import {CreateNotes, GetNotes} from '../container/QueryContainer';
// import { ApolloProvider } from '@apollo/client';

// import {useParams} from 'react-router-dom';
// const GET_NOTES = gql`
//   query notes($title: String!) {
//     note(noteInfo: {title: $title}) {
//       _id
//       title
//     }
//   }
// `;

const CREATE_NOTE = gql`
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

const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
    cache: new InMemoryCache()
});


function Test() {
    //     client
    //     .query({
    //         query: gql`
    //         query GetRates {
    //             rates(currency: "USD") {
    //             currency
    //             }
    //         }
    //         `
    //     })
    //     .then(result => console.log(result));

    //     return <ApolloProvider client={client}>
    //     <div>
    //       <h2>My first Apollo app 🚀</h2>
    //     </div>
    //   </ApolloProvider>

    /* Mutation Example */
    // const title = "TestNote";
    // const [createNote, { loading, error, data }] = useMutation(CREATE_NOTE, { client: client });
    // const addNote = () => {
    //     createNote({ variables: { title: title } });
    // }
    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error :(</p>;
    // return (
    //     <>
    //         <button onClick={addNote}>Add</button>
    //         <h1>Note - {data?.create_note?.note?.title}</h1>
    //     </>
    // )

    /* Query Example */
    // const {title} = useParams();
    // const { loading, error, data } = useQuery(GET_NOTES,{
    //     client:client,
    //     variables:{title: title}
    // });

    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error :(</p>;
    // return <h1>Note - {data.note.title}</h1>

    /* Testing Mutation using Container */
    // var container = new NoteListContainer();
    var {loading, error, noteList} = GetNotes();
    var response = CreateNotes('ram');
    // const [createNote, { loading, error, data }] = useMutation(CREATE_NOTE, { client: client });
    // const addNote = () => {
    //     createNote({ variables: { title: title } });
    // }
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    return (
            <ul>
                {noteList.notes.map(value => {
                    return <li>{value.title}</li>
                })}
            </ul>
    )
}

export default Test;