import { useState, useEffect } from "react";
import { auth } from "./config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import "./Profile.css";
import shePanda from "./assets/she-panda.png";
import hePanda from "./assets/he-panda.png";
import theyPanda from "./assets/they-panda.png";

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const profilePictures = [shePanda, hePanda, theyPanda];
  const [currentPic, setCurrentPic] = useState(function () {
    const saved = localStorage.getItem("selectedProfilePic");
    if (saved) {
      return parseInt(saved);
    }
    return 0;
  });

  useEffect(function () {
    function handleUser(firebaseUser) {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        navigate("/login");
      }
    }
    var listener = onAuthStateChanged(auth, handleUser);
    return function () {
      listener();
    };
  }, []);

  useEffect(
    function () {
      localStorage.setItem("selectedProfilePic", currentPic.toString());
    },
    [currentPic],
  );

  function getUsername() {
    if (!user) {
      return "";
    }
    return user.email.split("@")[0];
  }

  const handleLogout = async function () {
    await signOut(auth);
    navigate("/");
  };

  if (!user) {
    return null;
  }

  function prevPic() {
    setCurrentPic(function (prev) {
      if (prev === 0) {
        return profilePictures.length - 1;
      } else {
        return prev - 1;
      }
    });
  }

  function nextPic() {
    setCurrentPic(function (prev) {
      if (prev === profilePictures.length - 1) {
        return 0;
      } else {
        return prev + 1;
      }
    });
  }

  return (
    <div>
      <section className="profile-page-background"></section>
      <section className="profile-page-card">
        <h1>{getUsername()}'s</h1>
        <h1>Style Profile</h1>
        <div className="profile-content">
          <div className="select-profile-picture">
            <button className="arrow-button" onClick={prevPic}>
              ❮
            </button>
            <div
              className="profile-picture"
              style={{ backgroundImage: `url(${profilePictures[currentPic]})` }}
            ></div>
            <button className="arrow-button" onClick={prevPic}>
              ❯
            </button>
          </div>
          <h2>Celebrity style match:</h2>
        </div>
        <button onClick={handleLogout}>Log Out</button>
        <Link to="/" className="return-link-on-profile">
          Return to Home
        </Link>
      </section>
    </div>
  );
}

export default Profile;
