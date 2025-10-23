import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import Quiz from "./Quiz";
import Browse from "./Browse";

function HomePage() {
  return (
    <div className="homepage">
      <header className="topbar">
        <h1>StarStyle</h1>
        <div className="login-signup-buttons">
          <Link to="/login">
            <button className="login">Login</button>
          </Link>
          <Link to="/signup">
            <button className="signup">Sign Up</button>
          </Link>
        </div>
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;

/* references:
www.w3schools.com/react/react_router.asp
*/
