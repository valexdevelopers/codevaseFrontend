import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home"; // Create separate components for each page
import "bootstrap/dist/css/bootstrap.min.css";
import CodingArea from "./components/Codingeditor";
import CodingSpace from "./components/CodingSpace";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Home />} />
          <Route exact path="/signup" element={<Home />} />
          <Route exact path="/code-editor" element={<CodingArea />} />
          <Route exact path="/your-tasks" element={<CodingArea />} />
          <Route exact path="/space" element={<CodingSpace />} />

          {/* <Route path="/profile" component={UserProfile} />
          <Route path="/editor" component={Editor} />
          <Route path="/admin" component={AdminDashboard} />
          <Route component={NotFound} /> Handle 404 - Not Found */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
