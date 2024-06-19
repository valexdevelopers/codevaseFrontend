import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
// import "./App.css";

function CodingSpace() {
  const [htmlCode, setHtmlCode] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const iframeRef = useRef(null);

  useEffect(() => {
    updatePreview();
  }, [htmlCode]);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const updatePreview = () => {
    if (iframeRef.current) {
      const document = iframeRef.current.contentDocument;
      if (document) {
        document.open();
        document.write(htmlCode);
        document.close();
      }
    }
  };

  const handleHtmlChange = (e) => {
    setHtmlCode(e.target.value);
  };

  const formatCode = () => {
    // Implement code formatting logic here
  };

  const maximizeEditor = () => {
    // Implement maximize editor logic here
  };

  const minimizeEditor = () => {
    // Implement minimize editor logic here
  };

  const showHint = () => {
    alert("Hint: Try using basic HTML structure with inline styles.");
  };

  return (
    <Container className="dark-mode">
      <h1 className="text-center my-4">Coding Space</h1>
      <Row className="equal-height-row">
        <Col
          md={4}
          className="task-section border-right"
          style={{ border: "1px solid #333", padding: "20px" }}
        >
          <h4>Task Description</h4>
          <p>
            Write a simple HTML page with a heading and a paragraph. Style it
            using inline CSS and add some interactivity with inline JavaScript.
          </p>
        </Col>
        <Col
          md={4}
          className="editor-section border-right"
          style={{ border: "1px solid #333", padding: "20px" }}
        >
          <div className="editor-header">
            <Button color="primary" onClick={updatePreview}>
              Run
            </Button>
            <Button color="secondary" onClick={showHint}>
              Review
            </Button>
            <Dropdown
              isOpen={dropdownOpen}
              toggle={toggleDropdown}
              className="ml-auto"
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
          <textarea
            className="form-control code-editor"
            placeholder="Write HTML code here..."
            value={htmlCode}
            onChange={handleHtmlChange}
          />
        </Col>
        <Col
          md={4}
          className="result-section"
          style={{ border: "1px solid #333", padding: "20px" }}
        >
          <h4>Result</h4>
          <iframe
            ref={iframeRef}
            title="Preview"
            className="w-100 result-preview"
            style={{ height: "100%" }}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default CodingSpace;
