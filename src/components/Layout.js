import {Fragment} from "react";
import React from "react";
import Header from "./Header";

class Layout extends React.Component {
    render() {
        return (
            <Fragment>
                <Header title={this.props.title} actions={this.props.actions}/>
                {this.props.children}
            </Fragment>
        );
    }
}

export default Layout;