import React from "react";
import Layout from "./Layout";
import firebase from 'firebase';
import MdEditor from "./MdEditor";

class List extends React.Component {

    state = {
        db: firebase.database().ref('/'),
        data: {}
    }

    componentDidMount() {
        // this.state.db.on('value', (snapshot) => {
        //     this.setState({data: snapshot.val()});
        // });
    }

    componentWillUnmount() {
        // this.state.db.off();
    }

    render() {
        return (
            <Layout>
                {this.state.data.name || '...'}
                <MdEditor/>
            </Layout>);
    }
}

export default List;