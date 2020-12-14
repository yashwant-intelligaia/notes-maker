import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Editor from './Editor';
// import SocialAuth from './SocialAuth';

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

function Home() {
    const classes = useStyles();

    return (
        <Card className={classes.root} variant="outlined">
            {/* <SocialAuth/> */}
            <CardContent>
                <Editor/>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}

export default Home;