import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyEvent from "./pages/MyEvent";
import NewEvent from "./pages/NewEvent";
import MyRecommendations from "./pages/MyRecommendations";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/my-events" element={<MyEvent />} />
            <Route path="/recommendations" element={<MyRecommendations />} />
            <Route path="/add-event" element={<NewEvent />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
