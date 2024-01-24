import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import QuillEditor from './QuillEditor';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/quill">Quill Editor</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/quill" element={<QuillEditor />} />
          <Route path="/" element={<h1>Welcome to Commfluence</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
