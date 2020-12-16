import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import NoteIcon from '@material-ui/icons/Note';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
const GET_NOTES = gql`
  query notes{
    notes{
      _id
      title
    }
  }
`;
const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
    cache: new InMemoryCache()
});

function NoteList(props) {
    const history = useHistory();
    const [title, changeNoteTitle] = useState("");
    const handleChangeTitle = (event) => { changeNoteTitle(event.target.value) }
    const handleNoteClick = (value) => { history.push(`/note/` + value) }
    const { loading, error, data } = useQuery(GET_NOTES, {
        client: client
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item xs={6} sm={2}>
                    <h1>NoteList</h1>
                </Grid>
                <Grid item xs={6} sm={10}>
                    <Tooltip title="Add" placement="left-start">
                        <Fab color="primary" aria-label="add" onClick={props.dialogOpen}>
                            <AddIcon />
                        </Fab>
                    </Tooltip>
                </Grid>
            </Grid>
            <List component="nav" aria-label="main mailbox folders">
                {data.notes.map(value => {
                    return (
                        <ListItem key={value._id} button onClick={() => handleNoteClick(value.title)}>
                            <ListItemIcon>
                                <NoteIcon />
                            </ListItemIcon>
                            <ListItemText primary={value.title} />
                        </ListItem>
                    )
                })}
            </List>

            <Dialog open={props.dialog} onClose={props.handleDialogClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Note</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Title"
                        type="text"
                        fullWidth
                        autoComplete="off"
                        value={title}
                        error={props.error}
                        helperText={props.errorText}
                        onChange={handleChangeTitle}
                        onKeyUp={props.titleOnChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.dialogClose} color="primary">Cancel</Button>
                    <Button onClick={()=>{props.addNote(title)}} color="primary" disabled={title === ""}>Add</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default NoteList;