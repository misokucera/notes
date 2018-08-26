import React from "react";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Typography from "@material-ui/core/Typography/Typography";
import { withStyles } from '@material-ui/core/styles';
import Logout from "./Logout";
import Button from "@material-ui/core/Button/Button";
import {Link} from "react-router-dom";

const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    anchor: {
        color: 'inherit',
        textDecoration: 'none'
    }
};

class Header extends React.Component {

    render() {
        const { classes } = this.props;

        return  (
            <div className={classes.root}>
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            List
                        </Typography>
                        <Link to="/note" className={classes.anchor}>
                            <Button color='inherit' onClick={this.onNewNoteClick}>New</Button>
                        </Link>
                        <Link to="/" className={classes.anchor}>
                            <Button color='inherit' onClick={this.onListClick}>List</Button>
                        </Link>
                        <Logout/>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withStyles(styles)(Header);