import { useState } from 'react'
import ContentEditable from "react-contenteditable";
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import Grid from '@material-ui/core/Grid';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import useStyles from '../core/CustomCss';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

function Editor(props) {
    const [html, changeHtml] = useState(`<p>Hello <b>World</b> !</p><p>Paragraph 2</p>`);
    const [editable] = useState(true);
    const [title, changeTitle] = useState("");
    const classes = useStyles();
    const handleChange = (evt) => { changeHtml(evt.target.value) };
    const handleTitle = (event) => { changeTitle(event.target.value) };
    const client = new ApolloClient({
        uri: 'http://localhost:3000/graphql',
        cache: new InMemoryCache()
    });

    const addTitle = async () => {
        await client.mutate({
            mutation: gql`
            mutation{
                create_note(noteInfo:{title:"History-notes-4"}){
                    status
                    errors{
                        message
                    }
                    note{
                        title
                        _id
                    }
                }
            }`
        })
            .then(result => console.log(result));
    }
    return (<>
        <Grid container spacing={3} className={classes.centered+(!props.canEditTitle?"":(" "+classes.displayNone))}>
            <Grid item xs={6}>
                <TextField className={classes.textField} id="standard-basic" label="Title" onChange={handleTitle} />
            </Grid>
            <Grid item xs={6}>
                <Fab
                    variant="extended"
                    size="small"
                    color="primary"
                    aria-label="add"
                    className={classes.margin}
                    disabled={title ==="" ? true : false}
                    onClick={addTitle}>
                    <CheckIcon />Add</Fab>
            </Grid>
        </Grid>
        <Grid container spacing={3} className={classes.centered}>
            <Grid item xs={6}>
                <span className={classes.heading2}>{props.title}</span>
                <IconButton color="primary" aria-label="upload picture" component="span">
                    <EditIcon />
                </IconButton>
            </Grid>
        </Grid>
        <ContentEditable
            className={classes.editable}
            tagName="pre"
            html={html} // innerHTML of the editable div
            disabled={!editable} // use true to disable edition
            onChange={handleChange} // handle innerHTML change
        />
    </>)
}

export default Editor;