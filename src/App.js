import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home'; // Create separate components for each page
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="App">
 
        <Routes>
          <Route exact path="/" element={<Home/>} />
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
