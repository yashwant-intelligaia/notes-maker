import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Home from './component/Home';
import Note from './component/Note';
import NoteList from './component/NoteList';
import Test from './component/Test';
import PageNotFound from './component/PageNotFound'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { ApolloClient, InMemoryCache, gql, useMutation } from '@apollo/client';
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
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  fullwidth: {
    width: "100%"
  }
});

function App() {
  const [noteError, updateNoteError] = useState(false);
  const [open, setDialogOpen] = useState(false);
  const [titleChanged, setTitleChanged] = useState(false);
  const handleDialogOpen = () => { setDialogOpen(true) };
  const handleDialogClose = () => { setDialogOpen(false) };
  const [noteErrorText, updateNoteErrorText] = useState("");
  var [createNote, { loading, error, data }] = useMutation(CREATE_NOTE, { client: client });
  const handleChangeOnTitle = () => { updateNoteError(false); updateNoteErrorText(""); setTitleChanged(true);}
  const classes = useStyles();
  const handleAddNote = async(title) => {
    setTitleChanged(false);
    await createNote({ variables: { title: title } });
    // if(data){
    //   updateNoteErrorText(data.create_note.status === 201?"":data.create_note.errors[0].message);
    //   updateNoteError(data.create_note.errors.length>0?true:false);
    //   setDialogOpen(data.create_note.status === 201?false:true);
    // }
  }

  useEffect(() => {
    if(data){
      updateNoteErrorText((data.create_note.status === 200 && data.create_note.errors.length>0 && !titleChanged)?data.create_note.errors[0].message:"");
      updateNoteError((data.create_note.errors.length>0 && !titleChanged)?true:false);
      setDialogOpen(data.create_note.status === 201?false:true);
    }
  })
  // console.log(data);
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Router>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/note/list" ><NoteList dialog={open} dialogClose={handleDialogClose} dialogOpen={handleDialogOpen} addNote={handleAddNote} error={noteError} errorText={noteErrorText} titleOnChange={handleChangeOnTitle} /></Route>
            <Route exact path="/test/:title" component={Test}></Route>
            <Route path="/note/:title" component={Note}></Route>
            <Route component={PageNotFound}></Route>
          </Switch>
        </Router>
      </CardContent>
    </Card>
  );
}

export default App;