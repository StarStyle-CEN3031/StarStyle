import { useState } from "react";
import { auth } from "./config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      console.log(result);
      alert('Account created!');
      navigate('/');
      const token = await result.user.getIdToken();
      
      // or "http://localhost:5001/api/protected"
      const response = await fetch("https://starstyle-production.up.railway.app/api/protected", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      
      const userData = await response.json();
      console.log("User Data:", userData);
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };


  return ( 
    <div>
      <section className="auth-background"></section>
      <section className="auth-page">
        <h1>Create your account!</h1>
        <form onSubmit={handleSignUp}>
          <label>Enter your email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Choose your password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
      </section>
    </div>
  );
}

export default SignUp;

/* references:
www.freecodecamp.org/news/authenticate-react-app-using-firebase/
*/
