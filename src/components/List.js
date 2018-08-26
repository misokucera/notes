import React, {Fragment} from "react";
import Layout from "./Layout";
import firebase from 'firebase';
import Card from "@material-ui/core/Card/Card";
import "./Card.css";
import CardContent from "@material-ui/core/CardContent/CardContent";
import MarkdownView from "./MarkdownView";
import { WidthProvider, Responsive } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import CardHeader from "@material-ui/core/CardHeader/CardHeader";
import IconButton from "@material-ui/core/IconButton/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Redirect from "react-router-dom/Redirect";
import FormatHelper from "../helpers/FormatHelper";
import {Link} from "react-router-dom";

const ResponsiveLayout = WidthProvider(Responsive);

class List extends React.Component {

    user = firebase.auth().currentUser.uid;
    db = firebase.database();

    state = {
        notes: [],
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

    onDeleteClick(noteId) {
        this.db.ref(this.user + '/notes/' + noteId).remove(() => {
            this.setState({
               notes: this.state.notes.filter((note) => note.key !== noteId)
            });
        });
    }

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
            <Card key={note.key} className="Card">
                <CardHeader
                    action={
                        <Fragment>
                            <Link to={"/note/" + note.key}>
                                <IconButton>
                                    <EditIcon />
                                </IconButton>
                            </Link>
                            <IconButton onClick={() => this.onDeleteClick(note.key)}>
                                <DeleteIcon />
                            </IconButton>
                        </Fragment>
                    }
                    subheader={FormatHelper.formatDateTime(note.val().updatedTime)}
                />
                <CardContent>
                    <MarkdownView type="compact" source={note.val().content}/>
                </CardContent>
            </Card>
        ));

        return (
            <Layout>
                <ResponsiveLayout className="layout"
                                  layouts={this.state.layouts}
                                  cols={{ lg: 5, md: 4, sm: 3, xs: 2, xxs: 1 }}
                                  rowHeight={200}
                                  width={1200}
                                  onLayoutChange={this.onLayoutChange}>
                        {notes}
                </ResponsiveLayout>
            </Layout>
        );
    }
}

export default List;