import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import LoginView from "./views/LoginView";
import { LoginProvider, useLoginContext } from "./context/LoginContext";
import Dashboard from "./components/Dashboard";

// Componente de ruta protegida
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { loginList } = useLoginContext();

  // Verificamos si hay un token o si `loginList` contiene datos
  const isAuthenticated = localStorage.getItem("token") || loginList.length > 0;

  // Redirigir al login si no está autenticado
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  return (
    <LoginProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginView />} />
          <Route
            path="/dashboard/*"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          {/* Redirigir cualquier ruta desconocida al login */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </LoginProvider>
  );
}

export default App;
