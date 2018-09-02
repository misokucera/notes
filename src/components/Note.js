import React from "react";
import Layout from "./Layout";
import firebase from 'firebase';
import Editor from "./Editor";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

class Note extends React.Component {

    constructor(props) {
        super(props);
        const userId = firebase.auth().currentUser.uid;
        const noteId = props.match.params.noteId || null;
        this.state = ({userId, noteId, editorState: ''});
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

        console.log(title);
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
        });
    }

    extractTitle(text) {
        const matches = text.match("^# (.+)");
        return matches && matches.length > 0 ? matches[1] : '';
    }

    render() {
        return (
            <Layout title="Note">
                <Editor editorState={this.state.editorState} onSave={this.onEditorSave}/>
            </Layout>);
    }
}

export default Note;