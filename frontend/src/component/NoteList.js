import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
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
import { CREATE_NOTE } from '../core/Mutation';
import { Client } from '../core/Declaration';
import { GetNotes } from '../container/QueryContainer';

function NoteList(props) {
    const history = useHistory();
    const [open, changeDialog] = useState(false);
    const [title, changeNoteTitle] = useState("");
    const [titleError, changeTitleError] = useState({ status: false, message: "" })
    const handleChangeTitle = (event) => { changeNoteTitle(event.target.value); changeTitleError({ status: false, message: "" }) }
    const clickCloseDialog = () => { changeDialog(false); changeNoteTitle(""); changeTitleError({ status: false, message: "" }) }
    const clickOpenDialog = () => { changeDialog(true) }
    const handleNoteClick = (value) => { history.push(`/note/` + value) }
    
    const { loading, error, noteList } = GetNotes();
    var [createNote, { data }] = useMutation(CREATE_NOTE, { client: Client });
    useEffect(() => {
        if (data && data.create_note && data.create_note.status === 201) {
            clickCloseDialog();
            history.push(`/note/` + data.create_note.note.title)
        }

        if (data && data.create_note && data.create_note.status === 200) {
            changeTitleError({ status: true, message: data.create_note.errors[0].message });
        }
    }, [history, data]);

    const addNote = () => {
        createNote({ variables: { title: title } });
    }

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
                        <Fab color="primary" aria-label="add" onClick={clickOpenDialog}>
                            <AddIcon />
                        </Fab>
                    </Tooltip>
                </Grid>
            </Grid>
            <List component="nav" aria-label="main mailbox folders">
                {noteList.notes.map(value => {
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

            <Dialog open={open} onClose={clickCloseDialog} aria-labelledby="form-dialog-title">
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
                        error={titleError.status}
                        helperText={titleError.message}
                        onChange={handleChangeTitle}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={clickCloseDialog} color="primary">Cancel</Button>
                    <Button onClick={addNote} color="primary" disabled={title === ""}>Add</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default NoteList;