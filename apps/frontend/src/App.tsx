import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./page/Home/Home";
import { Toaster } from "react-hot-toast";
import Navbar from "./componets/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      {/* @ts-ignore */}
      <Routes>
           {/* @ts-ignore */}
        <Route path="/" element={<Home />} />
      </Routes>
         {/* @ts-ignore */}
      <Toaster />
    </Router>
  );
}

export default App;
