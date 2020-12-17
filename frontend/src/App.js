import Note from './component/Note';
import NoteList from './component/NoteList';
import Test from './component/Test';
import PageNotFound from './component/PageNotFound'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import useStyles from './core/CustomCss';

function App() {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Router>
          <Switch>
            <Route exact path="/" ><NoteList /></Route>
            <Route exact path="/test/:title" component={Test}></Route>
            <Route path="/note/:id" component={Note}></Route>
            <Route component={PageNotFound}></Route>
          </Switch>
        </Router>
      </CardContent>
    </Card>
  );
}

export default App;