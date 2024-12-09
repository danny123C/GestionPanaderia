import Login from "../components/LoginComponents/loginPrincipal";
import { LoginProvider } from "../context/LoginContext";

function LoginView() {
  return (
    <LoginProvider>
      <Login />
    </LoginProvider>
  );
}

export default LoginView;
