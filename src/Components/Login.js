import React from "react";
import { auth, provider } from "./firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      localStorage.setItem("userId", user.uid);

      navigate("/dashboard");

      toast.success(`Welcome, ${user.displayName}!`);
    } catch (error) {
      toast.error("Error signing in with Google: ", error);
      toast.error("Failed to sign in. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 flex items-center justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
            alt="Google Icon"
            className="w-8 h-8 mr-2"
          />
          Sign In
        </h1>
        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition flex items-center justify-center"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
            alt="Google Icon"
            className="w-5 h-5 mr-2"
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
