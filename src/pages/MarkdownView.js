import React from "react";
import ReactMarkdown from 'react-markdown';
import './MarkdownView.css';

class MarkdownView extends React.Component {
    render() {
        const compactClass = this.props.type === 'compact' ? 'Compact' : '';

        return (
            <div className={"MarkdownView " + compactClass}>
                <ReactMarkdown source={this.props.source} />
            </div>
        );
    }
}

export default MarkdownView;