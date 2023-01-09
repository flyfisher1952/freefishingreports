import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { $getRoot, $getSelection } from "lexical";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import "bootstrap/dist/css/bootstrap.min.css";

const theme = {};

// When the editor changes, you can get notified via the
// LexicalOnChangePlugin!
function onChange(editorState) {
    editorState.read(() => {
        // Read the contents of the EditorState here.
        const root = $getRoot();
        const selection = $getSelection();

        console.log(root, selection);
    });
}

function MyCustomAutoFocusPlugin() {
    const [editor] = useLexicalComposerContext();
    useEffect(() => {
        // Focus the editor when the effect fires!
        editor.focus();
    }, [editor]);

    return null;
}

function onError(error) {
    throw error;
}

const ReportEditor = () => {
    const initialConfig = {
        namespace: "ReportEditor",
        theme,
        onError,
    };

    return (
        <Container fluid className="vh-100">
            <Row>
                <label>Specific Location Name: </label>
                <input type="text"></input>
            </Row>
            <Row>
                <LexicalComposer initialConfig={initialConfig}>
                    <PlainTextPlugin contentEditable={<ContentEditable />} placeholder={<div>Enter some text...</div>} />
                    <OnChangePlugin onChange={onChange} />
                    <HistoryPlugin />
                    <MyCustomAutoFocusPlugin />
                </LexicalComposer>
            </Row>
        </Container>
    );
};

export default ReportEditor;
