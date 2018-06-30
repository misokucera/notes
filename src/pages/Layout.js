import {Fragment} from "react";
import React from "react";
import Logout from "./Logout";
import Header from "./Header";

class Layout extends React.Component {
    render() {
        return (
            <Fragment>
                <Header/>
                {this.props.children}
            </Fragment>
        );
    }
}

export default Layout;