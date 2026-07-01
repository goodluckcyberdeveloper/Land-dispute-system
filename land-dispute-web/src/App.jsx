import { BrowserRouter, Routes, Route } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Disputes from "./pages/Disputes";
import MapView from "./pages/MapView";
import DisputeDetails from "./pages/DisputeDetails";
import Reports from "./pages/Reports";
import ManageUsers from "./pages/ManageUsers";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import ProtectedRoute from "./routes/ProtectedRoute";
import AssignedDisputes from "./pages/AssignedDisputes";
import UpdateStatus from "./pages/UpdateStatus";

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
      <Route path="/reports" element={<Reports />} />
      <Route path="/manage-users" element={<ManageUsers />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/profile" element={<Profile />} />
      <Route
           path="/assigned-disputes"
           element={<AssignedDisputes />}
      />

      <Route
           path="/update-status"
           element={<UpdateStatus />}
      />

      </Routes>
    </BrowserRouter>
  );
}

export default App;