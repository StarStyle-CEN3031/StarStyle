import { useState } from "react";
import { auth } from "./config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Logged in!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div>
      <section className="auth-background"></section>
      <section className="auth-page">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="Email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="forgot-password">
            <Link to="reset-password">Forgot Password?</Link>
          </div>
          <button type="submit">Login</button>
        </form>
      </section>
    </div>
  );
}

export default Login;

/* references:
www.freecodecamp.org/news/authenticate-react-app-using-firebase/
*/
