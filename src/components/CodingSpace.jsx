import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Nav, NavItem, NavLink, Button } from "reactstrap";

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

  const handleHtmlChange = (e) => {
    setHtmlCode(e.target.value);
    updatePreview();
  };

  const handleCssChange = (e) => {
    setCssCode(e.target.value);
    updatePreview();
  };

  const handleJsChange = (e) => {
    setJsCode(e.target.value);
    updatePreview();
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
          <textarea
            className={`form-control full-width code-editor ${
              darkMode ? "dark-mode" : ""
            }`}
            value={htmlCode}
            onChange={handleHtmlChange}
          />
        </Col>
        <Col
          md={4}
          className={`editor-col ${
            activeTab !== "css" && "d-none d-md-block"
          } ${darkMode ? "dark-mode" : ""}`}
        >
          <h4>CSS</h4>
          <textarea
            className={`form-control full-width code-editor ${
              darkMode ? "dark-mode" : ""
            }`}
            value={cssCode}
            onChange={handleCssChange}
          />
        </Col>
        <Col
          md={4}
          className={`editor-col ${activeTab !== "js" && "d-none d-md-block"} ${
            darkMode ? "dark-mode" : ""
          }`}
        >
          <h4>JavaScript</h4>
          <textarea
            className={`form-control full-width code-editor ${
              darkMode ? "dark-mode" : ""
            }`}
            value={jsCode}
            onChange={handleJsChange}
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
