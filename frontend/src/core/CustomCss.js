import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
    root: {
        minWidth: 275,
        minHeight: "98vh"
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
    },
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
        margin: "0 5%"
    },
    textField: {
        width: "100%"
    },
    textCenter: {
        textAlign: "center"
    },
    heading1: {
        fontSize: "2em",
        fontWeight: "bold"
    },
    heading2: {
        fontSize: "1.5em",
        fontWeight: "bold"
    },
    displayNone: {
        display: "none"
    },
    userNamedialogBox:{
        width: "90%",
        margin: "auto",
        textAlign: "center"
    }
});

export default useStyles;