import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  const user = localStorage.getItem("user");

  return user ? <Dashboard /> : <Login />;
}

export default App;