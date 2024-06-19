import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Admin from './components/Admin'; // Create separate components for each page
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserAuthProvider } from './context/UserAuthProvider';
import UserPrivateRoute from './UserPrivateRoute';
import CodeEditorWindow from './components/CodeEditor'

function App() {
  return (

	  <UserAuthProvider>
		  
			{/* <AdminAuthProvider> */}
			<Router>
			  <div className="App">
				  <Routes>
					  <Route exact path="/" element={<Home />} />
					  <Route path="/login" element={<Home />} />
					  <Route path="/signup" element={<Home />} />
					  <Route path="/coding-space" element={<CodeEditorWindow />} />
					  {/* admin routes */}
					  <Route path="/admin/" element={<Admin />} />
					  <Route path="/admin/users/all" element={<Admin />} />
					  <Route path="/admin/task" element={<Admin />} />
					  <Route path="/admin/task/new" element={<Admin />} />
				  </Routes>
			  </div>
			</Router>
			{/* </AdminAuthProvider> */}
		</UserAuthProvider>
 
  );
}

export default App;
