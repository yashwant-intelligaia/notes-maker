import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

function Note(){
    const [checked, changeChecked] = useState(false);
    // const [note, updateNote] = useState(null);
    const {title} = useParams();
    console.log(title);
    
    useEffect(async() => {
        if(!checked){
            changeChecked(true);
            const client = new ApolloClient({
                uri: 'http://localhost:3000/graphql',
                cache: new InMemoryCache()
            });
            
            await client.query({
                query: gql`{
                    note(noteInfo:{title:"Geo-notes"}){
                        _id
                        title
                    }
                }`,
            })
            .then(result => {console.log(result); });
        }
    });
    return <h1>Note</h1>
}

export default Note;