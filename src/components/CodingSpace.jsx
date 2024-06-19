import React, { useRef, useState } from 'react';
import { Container, Row, Col, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'react-bootstrap'; // Import Bootstrap components if not already imported
import Editor from '@monaco-editor/react'; // Assuming you're using Monaco Editor

const CodingSpace = () => {
    const [htmlCode, setHtmlCode] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const iframeRef = useRef(null);
    const [language, setLanguage] = useState(languageOptions[0]);
    const handleHtmlChange = (newValue) => {
        setHtmlCode(newValue);
    };

    const updatePreview = () => {
        const iframeDocument = iframeRef.current.contentDocument;
        iframeDocument.open();
        iframeDocument.write(htmlCode);
        iframeDocument.close();
    };

    const showHint = () => {
        // Implement logic for showing hints
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const formatCode = () => {
        // Implement logic to format code in the editor
    };

    const maximizeEditor = () => {
        // Implement logic to maximize the editor
    };

    const minimizeEditor = () => {
        // Implement logic to minimize the editor
    };

    return (
        <Container fluid style={{ height: "100vh", padding: "0" }}>
            <h1 className="text-center my-4">Coding Space</h1>
            <Row style={{ height: "100%" }}>
                <Col
                    md={4}
                    style={{
                        background: "#d3d3d3",
                        padding: "20px",
                        overflowY: "auto",
                        borderRight: "1px solid #333",
                    }}
                >
                    <h4>Task Description</h4>
                    <p>
                        Write a simple HTML page with a heading and a paragraph. Style it
                        using inline CSS and add some interactivity with inline JavaScript.
                    </p>
                </Col>
                <Col
                    md={4}
                    style={{
                        background: "#2c2c2c",
                        padding: "20px",
                        color: "#ff5555",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        borderRight: "1px solid #333",
                    }}
                >
                    <div style={{ flexGrow: 1 }}>
                        <Editor
                            height="calc(100vh - 150px)" // Adjust the height as per your requirement
                            defaultLanguage="html"
                            theme="vs-dark"
                            value={htmlCode}
                            onChange={handleHtmlChange}
                            options={{
                                lineNumbers: "on",
                                automaticLayout: true,
                            }}
                        />
                    </div>
                    <div style={{ marginTop: "10px", textAlign: "center" }}>
                        <Button
                            variant="primary"
                            onClick={updatePreview} // Trigger updatePreview on button click
                            style={{ marginRight: "10px" }}
                        >
                            Run
                        </Button>
                        <Button variant="secondary" onClick={showHint}>
                            Review
                        </Button>
                        <Dropdown
                            isOpen={dropdownOpen}
                            toggle={toggleDropdown}
                            className="ml-auto"
                            style={{ display: "inline-block" }}
                        >
                            <DropdownToggle caret>Options</DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem onClick={formatCode}>Format Code</DropdownItem>
                                <DropdownItem onClick={maximizeEditor}>
                                    Maximize Editor
                                </DropdownItem>
                                <DropdownItem onClick={minimizeEditor}>
                                    Minimize Editor
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </Col>
                <Col
                    md={4}
                    style={{
                        background: "#d3d3d3",
                        padding: "20px",
                        overflowY: "auto",
                    }}
                >
                    <h4>Result</h4>
                    <iframe
                        ref={iframeRef}
                        title="Preview"
                        style={{
                            width: "100%",
                            height: "calc(100% - 40px)",
                            border: "none",
                        }}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default CodingSpace;
