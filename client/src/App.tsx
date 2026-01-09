import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateEvents from "./pages/CreateEvents";
import EventDetails from "./pages/EventDetails";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createEvents" element={<CreateEvents />} />
          <Route path="/eventDetails" element={<EventDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
