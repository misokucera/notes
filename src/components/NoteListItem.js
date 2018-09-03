import React, {Fragment} from 'react';
import FormatHelper from "../helpers/FormatHelper";
import Card from "@material-ui/core/Card/Card";
import CardHeader from "@material-ui/core/CardHeader/CardHeader";
import {Link} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton/IconButton";
import CardContent from "@material-ui/core/CardContent/CardContent";
import MarkdownView from "./MarkdownView";
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import { withStyles } from '@material-ui/core/styles';

const styles = {
    card: {
        position: 'relative',
        height: '100%',
        '&:after': {
            content: '""',
            position: 'absolute',
            width: '100%',
            height: '2em',
            pointerEvents: 'none',
            bottom: 0,
            background: 'linear-gradient(transparent, white 80%)'
        }
    }
};

class NoteListItem extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <Card className={classes.card}>
                <CardHeader
                    action={
                        <Fragment>
                            <Link to={"/note/" + this.props.id}>
                                <IconButton>
                                    <EditIcon />
                                </IconButton>
                            </Link>
                            <IconButton onClick={() => this.props.onNoteDelete(this.props.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </Fragment>
                    }
                    subheader={FormatHelper.formatDateTime(this.props.note.updatedTime)}
                />
                <CardContent>
                    <MarkdownView type="compact" source={this.props.note.content}/>
                </CardContent>
            </Card>
        );
    }
}

export default withStyles(styles)(NoteListItem);
