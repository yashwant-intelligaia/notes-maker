import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import ContentEditable from "react-contenteditable";
const useStyles = makeStyles({
    editable: {
        fontFamily: "sans-serif",
        marginLeft: "10%",
        width: "75%",
        minHeight: "100px",
        border: "1px dashed #aaa",
        padding: "5px",
        resize: "none",
        outline: "none"
    }
});
function Editor() {
    const [html, changeHtml] = useState(`<p>Hello <b>World</b> !</p><p>Paragraph 2</p>`);
    const [editable, changeEditable] = useState(true);
    const classes = useStyles();
    const handleChange = (evt) => { changeHtml(evt.target.value) };

    // const toggleEditable = () => { changeEditable(!editable) };
    return <ContentEditable
        className={classes.editable}
        tagName="pre"
        html={html} // innerHTML of the editable div
        disabled={!editable} // use true to disable edition
        onChange={handleChange} // handle innerHTML change
    />
}

export default Editor;