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
import Autocomplete from '@material-ui/lab/Autocomplete';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 }
];

function Note(props) {
  const classes = useStyles();
  const { id } = useParams();
  const [title, changeTitle] = useState("");
  const [html, changeHtml] = useState(`<p>Hello <b>World</b> !</p><p>Paragraph 2</p>`);
  const [editable] = useState(true);
  const [editableTitle, changeEditableTitle] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  const autoCompleteSelectedOption = (option, value) =>{
    console.log('value=>',value);

  }

  const handleKeyPress = (e) =>{
    var charCode = e.charCode || e.keyCode;
    console.log('char code',e);
    if(charCode===64){
      handleClickOpen(true);
    }

    // const {
    //   currentTarget: input,
    //   which,
    //   type,
    // } = e
    // // grab properties of input that we are interested in
    // const {
    //   offsetHeight,
    //   offsetLeft,
    //   offsetTop,
    //   offsetWidth,
    //   scrollLeft,
    //   scrollTop,
    //   selectionStart,
    //   value,
    // } = input
    // const {
    //   paddingRight,
    //   lineHeight,
    // } = getComputedStyle(input)
    // console.log('offsetHeight',offsetHeight, 'offsetTop=>',offsetTop, 'offsetLeft=>',offsetLeft, 'offsetWidth=>', offsetWidth, 'scrollLeft=>',scrollLeft, 'scrollTop=>',scrollTop, 'selectionStart=>',selectionStart)

    // console.log('paddingRight=>',paddingRight, ' lineHeight=>',lineHeight)
    // const { selectionStart, selectionEnd } = e.target
    // console.log('selectionStart',window.getSelection().getRangeAt(0).startOffset);
    // console.log('start',e.target.selectionStart);
    // if(e.charCode===13 && e.ctrlKey){

    // }
    // console.log('first');
    // console.log(e.charCode);
    // console.log('ctrlKey',e.ctrlKey)
    // console.log('value =>', e.target.value);
  }
  const handleKeyDown = (e) =>{
    // console.log('key down', e.keyCode);
  }
  const handleChange = (evt) => { 
    // evt = evt || window.event;
    let event = window.event;
    // console.log('change',event.charCode);
    changeHtml(evt.target.value)
  };
  const handleTitle = (event) => { changeTitle(event.target.value) };
  const handleEditableTitle = () => { changeEditableTitle(true); }
  var [updateNote, { uloading, uerror, status }] = useMutation(UPDATE_NOTE, { client: Client, variables: { _id: id, title: title, content: html } });
  const handleUpdateTitle = () => { changeTitle(title); changeEditableTitle(false); updateNote(); }
  const { loading, error, noteData } = GetNoteInfo({ _id: id });
  const defaultProps = {
    options: top100Films,
    getOptionLabel: (option) => option.title,
  };
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
        onKeyPress={handleKeyPress}
        onKeyDown={handleKeyDown}
        onBlur={updateNote}
      />
      <Dialog fullWidth onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
        <Autocomplete
          id="auto-complete"
          {...defaultProps}
          autoComplete
          includeInputInList
          className={classes.userNamedialogBox}
          onChange={autoCompleteSelectedOption}
          renderInput={(params) => <TextField {...params} label="autoComplete" margin="normal" />}
        />
      </Dialog>
    </React.Fragment>
  );
}

export default Note;