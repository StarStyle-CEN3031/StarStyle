import { useState, useEffect } from "react";
import { auth } from "./config/firebase";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import Quiz from "./Quiz";
import Browse from "./Browse";
import Profile from "./Profile";
import { onAuthStateChanged } from "firebase/auth";

function HomePage() {
  const [user, setUser] = useState(null);

  useEffect(function () {
    function handleUser(firebaseUser) {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        setUser(null);
      }
    }

    var listener = onAuthStateChanged(auth, handleUser);
    return function () {
      listener();
    };
  }, []);

  function getUsername() {
    if (!user) {
      return "";
    }
    return user.email.split("@")[0];
  }

  let topbarContent;
  if (user) {
    topbarContent = (
      <Link to="/profile" className="profile-link">
        Hello, {getUsername()}!
      </Link>
    );
  } else {
    topbarContent = (
      <div className="login-signup-buttons">
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/signup">
          <button>Sign Up</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="homepage">
      <header className="topbar">
        <h1>StarStyle</h1>
        <div className="topbar-right">{topbarContent}</div>
      </header>
      <section className="welcome-banner">
        <h2>Celebrity Style Made Affordable</h2>
        <h3>
          Discover the outfits worn by your favorite celebrities and find
          budget-friendly alternatives to recreate their looks.
        </h3>
        <input
          type="text"
          placeholder="Search by celebrity or occasion"
          className="search-bar"
        />
        <div className="welcome-buttons">
          <Link to="/quiz">
            <button className="quiz">Take Style Quiz</button>
          </Link>
          <Link to="/browse">
            <button className="browse">Browse All Looks</button>
          </Link>
        </div>
      </section>
      <section className="profiles-section">
        <h2>Featured Collections</h2>
        <div className="profiles">
          <div className="profile-card">Sabrina Carpenter</div>
          <div className="profile-card">Jenna Ortega</div>
          <div className="profile-card">Alexandra Saint Mleux</div>
          <div className="profile-card">Katseye</div>
        </div>
      </section>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

/* references:
www.w3schools.com/react/react_router.asp
dev.to/dchowitz/react-firebase-a-simple-context-based-authentication-provider-1ool
josecarrillo.me/creating-an-authentication-context-with-usecontext-in-react/
*/
