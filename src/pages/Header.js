import React from "react";
import AppBar from "@material-ui/core/es/AppBar/AppBar";
import Toolbar from "@material-ui/core/es/Toolbar/Toolbar";
import Typography from "@material-ui/core/es/Typography/Typography";
import { withStyles } from '@material-ui/core/styles';
import Logout from "./Logout";
import Button from "@material-ui/core/es/Button/Button";
import {Redirect} from "react-router-dom";

const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    }
};

class Header extends React.Component {

    state = {
        redirectTo: ''
    };

    onNewNoteClick = () => this.setState({redirectTo: '/note'});
    onListClick = () => this.setState({redirectTo: '/'});

    render() {
        const { classes } = this.props;

        return this.state.redirectTo !== ''
            ? <Redirect to={{ pathname: this.state.redirectTo }} />
            : <div className={classes.root}>
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            List
                        </Typography>
                        <Button color='inherit' onClick={this.onListClick}>List</Button>
                        <Button color='inherit' onClick={this.onNewNoteClick}>New</Button>
                        <Logout/>
                    </Toolbar>
                </AppBar>
            </div>
        ;
    }
}

export default withStyles(styles)(Header);