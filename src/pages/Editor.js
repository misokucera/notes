import React from "react";
import SplitPane from 'react-split-pane';
import {UnControlled as CodeMirror} from 'react-codemirror2';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/lib/codemirror.css';
import './SplitPane.css';
import './Editor.css';
import './CodeMirror.css';
import 'typeface-roboto-mono';
import MarkdownView from "./MarkdownView";
import Button from "@material-ui/core/es/Button/Button";

const codeMirrorOptions = {
    mode: 'markdown',
    viewPortMargin: 'infinity'
};

class Editor extends React.Component {

    state = {
        editorState: this.props.editorState };

    onChange = (editor, data, value) => {
        this.setState({editorState: value});
    };

    onSave = () => {
        this.props.onSave(this.state.editorState);
    }

    render() {
        return (
            <div className='Editor'>
                <div className='Bar'>
                    <Button color="primary" className="" onClick={this.onSave}>Save</Button>
                </div>
                <SplitPane split="vertical" minSize={200} defaultSize={800}>
                    <CodeMirror value={this.props.editorState} options={codeMirrorOptions} onChange={this.onChange} />
                    <MarkdownView source={this.state.editorState}/>
                </SplitPane>
            </div>
        );
    }
}

export default Editor;