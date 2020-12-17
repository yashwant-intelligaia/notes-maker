import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import { useQuery, gql } from '@apollo/client';
import Editor from './Editor';
import useStyles from '../core/CustomCss';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { Client } from '../core/Declaration';
const GET_NOTES = gql`
  query getNote($title: String!) {
    note(noteInfo: {title: $title}) {
      _id
      title
    }
  }
`;

function Note(props) {
  const [editableTitle, changeEditableTitle] = useState(true);
  const classes = useStyles();
  const { title } = useParams();
  const { loading, error, data } = useQuery(GET_NOTES, {
    client: Client,
    variables: { title: title }
  });
  const handleChangeEditableTitle = () => {
    changeEditableTitle(false);
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <React.Fragment>
      <div className={classes.textCenter + (editableTitle ? "" : (" " + classes.displayNone))}>
        <span className={classes.heading1}>{data.note.title}</span>&nbsp;
        <IconButton color="primary" aria-label="upload picture" component="span" onClick={handleChangeEditableTitle}>
          <EditIcon />
        </IconButton>
      </div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
        </Grid>
      </Grid>
      <Editor canEditTitle={editableTitle} />
    </React.Fragment>
  );
}

export default Note;