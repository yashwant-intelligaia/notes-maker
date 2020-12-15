import { makeStyles } from '@material-ui/core/styles';
import Home from './component/Home';
import Note from './component/Note';
import NoteList from './component/NoteList';
import Test from './component/Test';
import PageNotFound from './component/PageNotFound'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

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
  fullwidth:{
      width: "100%"
  }
});

function App() {
  const classes = useStyles();
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Router>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/note/list" component={NoteList}></Route>
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