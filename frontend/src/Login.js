import { useState } from 'react';
import { auth } from './config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link} from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Logged in!');
      navigate('/');
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div>
    <section className="auth_background">
    </section>

    <div>
    <section className="auth-page">
      <h1>User Login</h1>
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
        <div className="forget">
          <Link to="reset=password">Forget Password? Click here</Link>
        </div>
        <button type="submit">Login</button>
      </form>
      <div className="social_login">
        <p>Login with <span>google</span></p>
        <p>Login with <span>Facebook</span></p>
        <p>Login with others</p>
      </div>
    </section>
    </div>
    </div>
    
  );
}

export default Login;

/* references:
www.freecodecamp.org/news/authenticate-react-app-using-firebase/
*/