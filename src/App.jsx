

// import React from "react";
// // import Navbar from "./components/Navbar";
// import Home from "./pages/Home";  

// function App() {
//   return (
//     <>
     
//         <Home />
      
//     </>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CodeEditor from "./pages/codeeditor";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/codeeditor" element={<CodeEditor />} />
      </Routes>
    </Router>
  );
}

export default App;
