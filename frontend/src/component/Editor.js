import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import ContentEditable from "react-contenteditable";
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import Grid from '@material-ui/core/Grid';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const useStyles = makeStyles({
    editable: {
        fontFamily: "sans-serif",
        marginLeft: "5%",
        marginRight: "5%",
        minHeight: "100px",
        border: "1px dashed #aaa",
        padding: "5px",
        resize: "none",
        outline: "none"
    },
    centered: {
        marginLeft: "5%",
        marginRight: "5%",
    },
    textField: {
        width: "100%"
    }
});
function Editor() {
    const [html, changeHtml] = useState(`<p>Hello <b>World</b> !</p><p>Paragraph 2</p>`);
    const [editable, changeEditable] = useState(true);
    const [title, changeTitle] = useState("");
    const classes = useStyles();
    const handleChange = (evt) => { changeHtml(evt.target.value) };
    const handleTitle = (event) => { changeTitle(event.target.value) };
    const client = new ApolloClient({
        uri: 'http://localhost:3000/graphql',
        cache: new InMemoryCache()
    });
      
    // const toggleEditable = () => { changeEditable(!editable) };
    const addTitle = async() =>{
        // await client.query({
        //     query: gql`{
        //         user(userInput:{username:"yashwantr"}){
        //             username
        //             age
        //             _id
        //         }
        //     }`,
        // })
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
        <Grid container spacing={3} className={classes.centered}>
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
                    disabled={title == "" ? true : false}
                    onClick={addTitle}>
                <CheckIcon />Add</Fab>
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