import React from "react";
import Layout from "./Layout";
import firebase from 'firebase';
import Editor from "./Editor";
import Card from "@material-ui/core/es/Card/Card";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import MarkdownView from "./MarkdownView";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

class List extends React.Component {

    state = {
        db: firebase.database().ref('miso/notes'),
        notes: []
    }

    componentDidMount() {
        this.state.db.on('value', (snapshot) => {
            let notes = [];
            snapshot.forEach(item => { notes.push(item) });
            this.setState({notes});
        });
    }

    componentWillUnmount() {
        this.state.db.off();
    }

    onEditorSave = (data) => {
        const noteId = firebase.database().ref().child('miso').push().key;
        firebase.database().ref('miso/notes/' + noteId).update({
            content: data
        });
    };

    render() {

        const notes = this.state.notes.map((note) => (
            <Card key={note.key}>
                <CardContent>
                    <MarkdownView source={note.val().content}/>
                </CardContent>
            </Card>
        ));

        return (
            <Layout>
                <GridLayout className="layout" cols={3} rowHeight={200} width={1200}>
                    {notes}
                </GridLayout>
                <Editor onSave={this.onEditorSave}/>
            </Layout>);
    }
}

export default List;