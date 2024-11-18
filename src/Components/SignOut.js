import React from "react";
import { getAuth, signOut } from "firebase/auth";

const SignOut = () => {
  const handleSignOut = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      localStorage.removeItem("userId");
      alert("You have been signed out!");
    } catch (error) {
      console.error("Error signing out:", error);
      alert("Failed to sign out. Please try again.");
    }
  };

  return (
    <button
      onClick={handleSignOut}
      className="text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
    >
      Sign Out
    </button>
  );
};

export default SignOut;
