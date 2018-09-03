import React from "react";
import ReactMarkdown from 'react-markdown';
import { withStyles } from "@material-ui/core/styles";

const styles = {
    root: {
        padding: '1em',
        fontWeight: '400',
        color: '#444444',
        '& h1, & h2, & h3, & h4, & h5, & h6': {
            fontWeight: 400
        },
        '& p': {
            lineHeight: 1.4
        },
        '& code': {
            fontFamily: '"Roboto Mono", "Courier New", monospace',
            padding: '0 0.2em',
            fontSize: '0.9em',
            background: '#eee',
            borderRadius: '0.1em'
        }
    },
    compact: {
        padding: 0,
        '& > div > :first-child': {
            marginTop: 0
        }
    }
};

class MarkdownView extends React.Component {
    render() {
        const { classes } = this.props;
        let classNames = [classes.root];

        if (this.props.type === 'compact') {
            classNames.push(classes.compact);
        }

        return (
            <div className={classNames.join(' ')}>
                <ReactMarkdown source={this.props.source} />
            </div>
        );
    }
}

export default withStyles(styles)(MarkdownView);