import React from "react";
import ReactMarkdown from 'react-markdown';
import './MarkdownView.css';

class MarkdownView extends React.Component {
    render() {
        return (
            <div className="MarkdownView">
                <ReactMarkdown source={this.props.source} />
            </div>
        );
    }
}

export default MarkdownView;