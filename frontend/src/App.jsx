
import { BrowserRouter,Routes,Route ,Navigate} from "react-router-dom";
import Register  from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

function App(){
  return (
  <AuthProvider>

    <BrowserRouter>

    <Routes>

    <Route
    path="/"
    element={<Navigate to="/login" />}
    />

    <Route
    path="/register"
    element={<Register/>}
    />

    <Route
    path="/login"
    element={<Login/>}
    />

    <Route
    path="/dashboard"
    element={
    <ProtectedRoute>
      <Dashboard/>
    </ProtectedRoute>
    }
    />

    </Routes>

    </BrowserRouter>

</AuthProvider>
)
}

export default App;