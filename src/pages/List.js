import React from "react";
import Layout from "./Layout";
import firebase from 'firebase';
import Card from "@material-ui/core/es/Card/Card";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import MarkdownView from "./MarkdownView";
import { WidthProvider, Responsive } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import CardHeader from "@material-ui/core/es/CardHeader/CardHeader";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import EditIcon from '@material-ui/icons/es/Edit';
import Redirect from "react-router-dom/es/Redirect";
import FormatHelper from "./FormatHelper";

const ResponsiveLayout = WidthProvider(Responsive);

class List extends React.Component {

    user = firebase.auth().currentUser.uid;
    db = firebase.database();

    state = {
        notes: [],
        redirectTo: '',
        layouts: {}
    };

    componentDidMount() {
        this.db.ref(this.user + '/notes').once('value', (snapshot) => {
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

    onEditClick(noteId) {
        this.setState({ redirectTo: '/note/' + noteId })
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
            <Card key={note.key}>
                <CardHeader
                    action={
                        <IconButton onClick={() => this.onEditClick(note.key)}>
                            <EditIcon />
                        </IconButton>
                    }
                    subheader={FormatHelper.formatDateTime(note.val().updatedTime)}
                />
                <CardContent>
                    <MarkdownView source={note.val().content}/>
                </CardContent>
            </Card>
        ));

        return this.state.redirectTo !== ''
        ? <Redirect to={this.state.redirectTo} />
        : <Layout>
                <ResponsiveLayout className="layout"
                                  layouts={this.state.layouts}
                                  cols={{ lg: 5, md: 4, sm: 3, xs: 2, xxs: 1 }}
                                  rowHeight={200}
                                  width={1200}
                                  onLayoutChange={this.onLayoutChange}>
                        {notes}
                </ResponsiveLayout>
            </Layout>;
    }
}

export default List;