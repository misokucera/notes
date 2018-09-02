import React, {Fragment} from "react";
import Layout from "./Layout";
import firebase from 'firebase';
import Editor from "./Editor";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import Snackbar from "@material-ui/core/es/Snackbar/Snackbar";
import SnackbarContent from "@material-ui/core/es/SnackbarContent/SnackbarContent";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import "./Snackbar.css";

class Note extends React.Component {

    constructor(props) {
        super(props);
        const userId = firebase.auth().currentUser.uid;
        const noteId = props.match.params.noteId || null;
        this.state = ({
            userId,
            noteId,
            editorState: '# ',
            saveSnackBarVisible: false,
        });
    }

    componentDidMount() {
        if (this.state.noteId) {
            const ref = firebase.database().ref(this.state.userId + '/notes/' + this.state.noteId);
            ref.once('value', (snapshot) => {
                this.setState({
                    editorState: snapshot.val().content
                });
            });
        }
    }

    onEditorSave = (data) => {

        const title = this.extractTitle(data);

        if (!this.state.noteId) {
            const noteId = firebase.database().ref(this.state.userId).push().key;
            this.setState({ noteId }, () => this.save(title, data));
        } else {
            this.save(title, data)
        }
    };

    save(title, content) {
        firebase.database().ref(this.state.userId + '/notes/' + this.state.noteId).update({
            title: title,
            content: content,
            updatedTime: Date.now()
        }, (error) => {
            if (!error) {
                this.setState({
                    saveSnackBarVisible: true
                })
            }
        })
    }

    extractTitle(text) {
        const matches = text.match("^# (.+)");
        return matches && matches.length > 0 ? matches[1] : '';
    }

    handleSaveSnackBarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ saveSnackBarVisible: false });
    }

    render() {
        return (
            <Layout title="Note">
                <Editor editorState={this.state.editorState} onSave={this.onEditorSave}/>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}
                    open={this.state.saveSnackBarVisible}
                    autoHideDuration={3000}
                    onClose={this.handleSaveSnackBarClose}
                    ContentProps={{ 'aria-describedby': 'message-id' }}
                >
                    <SnackbarContent className="SnackbarContent message success" message={
                        <Fragment>
                            <CheckCircleIcon/>
                            <span id="message-id">Note saved</span>
                        </Fragment>
                    }
                    />
                </Snackbar>
            </Layout>);
    }
}

export default Note;