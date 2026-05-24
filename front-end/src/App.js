import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ForeignerTours from "./components/ForeignerTours";
import Accommodations from "./components/Accommodations";
import CarRentals from "./components/CarRentals";
import AuthModal from "./components/AuthModal";
import WelcomeScreen from "./components/WelcomeScreen";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");

  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState("login");

  // ✅ ADD THIS
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  // ✅ LOCK SCREEN
if (!user) {
  return (
    <>
      {/* ✅ SHOW ONLY WELCOME */}
      {!showAuth && (
        <WelcomeScreen
          onStart={() => {
            setAuthMode("login");
            setShowAuth(true);
          }}
        />
      )}

      {/* ✅ SHOW ONLY LOGIN (NOT BELOW, ONLY WHEN TRIGGERED) */}
      {showAuth && (
        <div className="auth-container">
          <AuthModal
            show={true}
            mode={authMode}
            setMode={setAuthMode}
            onAuthSuccess={(user) => {
              localStorage.setItem("user", JSON.stringify(user));
              setUser(user);
            }}
          />
        </div>
      )}
    </>
  );
}

  return (
    <>
      <Navbar setPage={setPage} />

      {page === "home" && <Hero setPage={setPage} />}
      {page === "tours" && <ForeignerTours />}
      {page === "accommodations" && <Accommodations />}
      {page === "cars" && <CarRentals />}
    </>
  );
}

export default App;
