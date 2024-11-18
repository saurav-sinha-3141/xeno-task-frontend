import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    return unsubscribe;
  }, []);

  const handleSignOut = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      localStorage.removeItem("userId");
      setIsLoggedIn(false);
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
      alert("Failed to sign out. Please try again.");
    }
  };

  return (
    <nav className="bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg">
      <div className="max-w-screen-xl flex justify-between items-center mx-auto p-4">
        <div className="text-white font-bold text-lg">Xeno</div>
        <div className="flex items-center">
          {isLoggedIn && (
            <button
              onClick={handleSignOut}
              className="text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
            >
              Sign Out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
