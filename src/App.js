import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Admin from './components/Admin'; // Create separate components for each page
import GuestAdmin from './components/GuestAdmin';
import "bootstrap/dist/css/bootstrap.min.css";
import { UserAuthProvider } from './context/UserAuthProvider';
import { AdminAuthProvider } from './context/AdminAuthProvider';
// import UserPrivateRoute from './UserPrivateRoute';
// import CodeEditorWindow from "./components/CodeEditor";
import CodingArea from "./components/CodingArea"

function App() {
  return (
    <Router>
      <div className="App">
		<AdminAuthProvider>
			<UserAuthProvider>
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route exact path="/login" element={<Home />} />
					<Route exact path="/signup" element={<Home />} />
					<Route path="/coding-space" element={<CodingArea />} />
					<Route path="/admin/login" element={<GuestAdmin />} />
					<Route path="/admin/signup" element={<GuestAdmin />} />
					<Route path="/admin/task/new" element={<Admin />} />
					<Route path="/admin/task/all" element={<Admin />} />	  
					{/* <Route exact path="/your-tasks" element={<CodingArea />} /> */}
					{/* <Route path="/profile" component={UserProfile} />
			<Route path="/editor" component={Editor} />
			<Route path="/admin" component={AdminDashboard} />
			<Route component={NotFound} /> Handle 404 - Not Found */}
				</Routes>
			</UserAuthProvider>
		</AdminAuthProvider>
        
        
      </div>
    </Router>
  );
}

export default App;
