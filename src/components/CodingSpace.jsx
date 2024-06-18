import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Nav, NavItem, NavLink, Button } from "reactstrap";
import { Controlled as CodeMirror } from "react-codemirror2"; // Importing CodeMirror component
import "codemirror/lib/codemirror.css"; // Codemirror base CSS
import "codemirror/theme/material.css"; // Theme example: Material
import "codemirror/theme/dracula.css"; // Theme example: Dracula
import "codemirror/mode/xml/xml"; // Example mode: XML
import "codemirror/mode/css/css"; // Example mode: CSS
import "codemirror/mode/javascript/javascript"; // Example mode: JavaScript

function CodingSpace() {
  const [htmlCode, setHtmlCode] = useState("");
  const [cssCode, setCssCode] = useState("");
  const [jsCode, setJsCode] = useState("");
  const [activeTab, setActiveTab] = useState("html");
  const [darkMode, setDarkMode] = useState(false);
  const iframeRef = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      updatePreview();
    }, 500);

    return () => clearTimeout(timeout);
  }, [htmlCode, cssCode, jsCode]);

  const updatePreview = () => {
    if (iframeRef.current) {
      const document = iframeRef.current.contentDocument;
      if (document) {
        document.open();
        document.write(
          `<html>
              <head>
                <style>${cssCode}</style>
              </head>
              <body>
                ${htmlCode}
                <script>${jsCode}<\/script>
              </body>
            </html>`
        );
        document.close();
      }
    }
  };

  const handleCodeChange = (editor, data, value, setCode) => {
    setCode(value);
    updatePreview();
  };

  const codeMirrorOptions = {
    lineNumbers: true,
    theme: darkMode ? "dracula" : "material", // Adjust theme as needed
    mode: "",
  };

  return (
    <Container className={darkMode ? "dark-mode" : ""}>
      <h1 className={`text-center my-4 ${darkMode ? "dark-mode" : ""}`}>
        Coding Space
      </h1>
      <Button color="secondary" onClick={() => setDarkMode(!darkMode)}>
        Toggle Dark Mode
      </Button>
      <Nav tabs className={`d-md-none ${darkMode ? "dark-mode" : ""}`}>
        <NavItem>
          <NavLink
            className={activeTab === "html" ? "active" : ""}
            onClick={() => setActiveTab("html")}
          >
            HTML
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === "css" ? "active" : ""}
            onClick={() => setActiveTab("css")}
          >
            CSS
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === "js" ? "active" : ""}
            onClick={() => setActiveTab("js")}
          >
            JS
          </NavLink>
        </NavItem>
      </Nav>
      <Row>
        <Col
          md={4}
          className={`editor-col ${
            activeTab !== "html" && "d-none d-md-block"
          } ${darkMode ? "dark-mode" : ""}`}
        >
          <h4>HTML</h4>
          <CodeMirror
            value={htmlCode}
            options={{ ...codeMirrorOptions, mode: "xml" }}
            onBeforeChange={(editor, data, value) =>
              handleCodeChange(editor, data, value, setHtmlCode)
            }
          />
        </Col>
        <Col
          md={4}
          className={`editor-col ${
            activeTab !== "css" && "d-none d-md-block"
          } ${darkMode ? "dark-mode" : ""}`}
        >
          <h4>CSS</h4>
          <CodeMirror
            value={cssCode}
            options={{ ...codeMirrorOptions, mode: "css" }}
            onBeforeChange={(editor, data, value) =>
              handleCodeChange(editor, data, value, setCssCode)
            }
          />
        </Col>
        <Col
          md={4}
          className={`editor-col ${activeTab !== "js" && "d-none d-md-block"} ${
            darkMode ? "dark-mode" : ""
          }`}
        >
          <h4>JavaScript</h4>
          <CodeMirror
            value={jsCode}
            options={{ ...codeMirrorOptions, mode: "javascript" }}
            onBeforeChange={(editor, data, value) =>
              handleCodeChange(editor, data, value, setJsCode)
            }
          />
        </Col>
        <Col md={12} className="mt-4">
          <iframe
            ref={iframeRef}
            title="Preview"
            className={`w-100 result-preview ${darkMode ? "dark-mode" : ""}`}
            style={{
              height: "500px",
              backgroundColor: darkMode ? "#1e1e1e" : "white",
            }}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default CodingSpace;
