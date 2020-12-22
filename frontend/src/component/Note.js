import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import useStyles from '../core/CustomCss';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ContentEditable from "react-contenteditable";
import TextField from '@material-ui/core/TextField';
import { GetNoteInfo } from '../container/QueryContainer';
import { UPDATE_NOTE } from '../core/Mutation';
import { Client } from '../core/Declaration';
import { useMutation } from '@apollo/client';

function Note(props) {
  const classes = useStyles();
  const { id } = useParams();
  const [title, changeTitle] = useState("");
  const [html, changeHtml] = useState(`<p>Hello <b>World</b> !</p><p>Paragraph 2</p>`);
  const [editable] = useState(true);
  const [editableTitle, changeEditableTitle] = useState(false);
  const handleKeyPress = (e) =>{
    const { selectionStart, selectionEnd } = e.target
    console.log('selectionStart',window.getSelection().getRangeAt(0).startOffset);
    // console.log('start',e.target.selectionStart);
    // if(e.charCode===13 && e.ctrlKey){

    // }
    console.log('first');
    console.log(e.charCode);
    console.log('ctrlKey',e.ctrlKey)
    console.log('value =>', e.target.value);
  }
  const handleChange = (evt) => { 
    console.log('second');
    changeHtml(evt.target.value)
  };
  const handleTitle = (event) => { changeTitle(event.target.value) };
  const handleEditableTitle = () => { changeEditableTitle(true); }
  var [updateNote, { uloading, uerror, status }] = useMutation(UPDATE_NOTE, { client: Client, variables: { _id: id, title: title, content: html } });
  const handleUpdateTitle = () => { changeTitle(title); changeEditableTitle(false); updateNote(); }
  const { loading, error, noteData } = GetNoteInfo({ _id: id });
  useEffect(() => {
    if (noteData && noteData.note) {
      changeTitle(noteData.note.title);
      if (noteData.note.content) {
        changeHtml(noteData.note.content)
      }
    }
  }, [noteData]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <React.Fragment>
      {editableTitle ?
        <Grid container className={classes.centered}>
          <Grid item xs={6}>
            <TextField autoFocus className={classes.textField} id="standard-basic" label="Title" value={title} onChange={handleTitle} onBlur={handleUpdateTitle} />
          </Grid>
          <Grid item xs={6}></Grid>
        </Grid>
        :
        <Grid container className={classes.centered}>
          <Grid item xs={6}>
            <span className={classes.heading2}>{title}</span>
            <IconButton color="primary" aria-label="upload picture" component="span" onClick={handleEditableTitle}>
              <EditIcon />
            </IconButton>
          </Grid>
        </Grid>
      }
      <ContentEditable
        className={classes.editable}
        tagName="pre"
        html={html} // innerHTML of the editable div
        disabled={!editable} // use true to disable edition
        onChange={handleChange} // handle innerHTML change
        // onKeyPress={handleKeyPress}
        onKeyDown={handleKeyPress}
        onBlur={updateNote}
      />
    </React.Fragment>
  );
}

export default Note;