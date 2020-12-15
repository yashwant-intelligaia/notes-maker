import React, { useState, useEffect } from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

function NoteList(props) {
    const [noteList, changeNoteList] = useState([]);
    const [checked, changeChecked] = useState(false);
    const history = useHistory();

    const handleNoteClick = (value) => {
        history.push(`/note/` + value);
    }

    useEffect(async () => {
        if (!checked) {
            changeChecked(true);
            const client = new ApolloClient({
                uri: 'http://localhost:3000/graphql',
                cache: new InMemoryCache()
            });
            await client.query({
                query: gql`{
                    notes{
                        _id
                        title
                    }
                }`,
            }).then(result => { changeNoteList(result.data.notes) });
        }
    });

    return (
        <React.Fragment>
            <h1>NoteList</h1>
            <ul>
                {noteList.map(value => {
                    return <li key={value._id}><a onClick={() => handleNoteClick(value.title)}>{value.title}</a></li>
                })}
            </ul>
            <Fab color="primary" aria-label="add">
                <AddIcon />
            </Fab>
        </React.Fragment>
    );
}

export default NoteList;