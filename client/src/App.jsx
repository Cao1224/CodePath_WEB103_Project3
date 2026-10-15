import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EventDetail from "./pages/EventDetail";
import LocationDetail from "./pages/LocationDetail";
import './App.css'

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route
                path="/locations/:locationId"
                element={<LocationDetail />}
            />
            <Route
                path="/events/:id"
                element={<EventDetail />}
            />
        </Routes>
    );
}

export default App