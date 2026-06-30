import { BrowserRouter, Routes, Route } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Disputes from "./pages/Disputes";
import MapView from "./pages/MapView";
import DisputeDetails from "./pages/DisputeDetails";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/disputes"
          element={
            <ProtectedRoute>
              <Disputes />
            </ProtectedRoute>
          }
        />

      <Route path="/map" element={<MapView />} />
      <Route path="/dispute/:id" element={<DisputeDetails />} />
      

      </Routes>
    </BrowserRouter>
  );
}

export default App;