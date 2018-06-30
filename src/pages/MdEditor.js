import React, {Fragment} from "react";
import ReactMarkdown from 'react-markdown';
import SplitPane from 'react-split-pane';
import {UnControlled as CodeMirror} from 'react-codemirror2';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import './MdEditor.css';

const options = {
    mode: 'markdown',
    // theme: 'material',
    lineNumbers: true
}

class MdEditor extends React.Component {

    state = {
        editorState: '# title'
    };

    constructor(props) {
        super(props);
        this.onChange = (editor, data, value) => {
            this.setState({editorState: value});
        }
    }
    render() {
        return (
            <Fragment>
                <SplitPane split="vertical" minSize={200} defaultSize={500}>
                    <div>
                        <CodeMirror options={options} onChange={this.onChange} />
                    </div>
                    <div>
                        <ReactMarkdown source={this.state.editorState} />
                    </div>
                </SplitPane>
            </Fragment>
        );
    }
}

export default MdEditor;