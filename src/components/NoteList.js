import React from "react";
import Layout from "./Layout";
import firebase from 'firebase';
import { WidthProvider, Responsive } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import NoteListItem from "./NoteListItem";

const ResponsiveLayout = WidthProvider(Responsive);

class NoteList extends React.Component {

    user = firebase.auth().currentUser.uid;
    db = firebase.database();

    state = {
        notes: [],
        layouts: {}
    };

    componentDidMount() {
        this.db.ref(this.user + '/notes').on('value', (snapshot) => {
            let notes = [];
            snapshot.forEach(item => { notes.push(item) });
            this.db.ref(this.user + '/layouts').once('value', (snapshot) => {
                this.setState({
                    notes,
                    layouts: snapshot.val() || {}
                });
            });
        });
    }

    componentWillUnmount() {
        this.db.ref(this.user + '/layouts').off();
        this.db.ref(this.user + '/notes').off();
    }

    onDeleteClick = (noteId) => {
        this.db.ref(this.user + '/notes/' + noteId).remove();
    };

    prepareLayouts(layouts) {
        const keys = Object.keys(layouts);
        let cleanedLayouts = {};

        keys.forEach((key) => {
            cleanedLayouts[key] = layouts[key].map((item) => {
                return { w: item.w, h: item.h, x: item.x, y: item.y, i: item.i }
            });
        });

        return cleanedLayouts;
    }

    onLayoutChange = (layout, layouts) => {
        const cleanedLayouts = this.prepareLayouts(layouts);
        this.db.ref(this.user + '/layouts').set(cleanedLayouts);
    };

    render() {
        const notes = this.state.notes.map((note) => (
            <div key={note.key}>
                <NoteListItem
                    id={note.key}
                    note={note.val()}
                    onNoteDelete={this.onDeleteClick}
                />
            </div>
        ));

        return (
            <Layout>
                {notes.length > 0 &&
                    <ResponsiveLayout className="layout"
                                      layouts={this.state.layouts}
                                      cols={{lg: 5, md: 4, sm: 3, xs: 2, xxs: 1}}
                                      rowHeight={200}
                                      width={1200}
                                      onLayoutChange={this.onLayoutChange}>
                        {notes}
                    </ResponsiveLayout>
                }
            </Layout>
        );
    }
}

export default NoteList;