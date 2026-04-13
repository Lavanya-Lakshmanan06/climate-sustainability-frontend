import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Lock } from "lucide-react";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login/Signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showLoginSuccess, setShowLoginSuccess] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        setShowLoginSuccess(true);
        setTimeout(() => {
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("userEmail", email);
          navigate("/");
        }, 2000);
      } else {
        alert("Invalid Credentials ❌");
      }
    } catch (error) {
      console.error(error);
      alert("Error connecting to server ❌");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill all fields ❌");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match ❌");
      return;
    }
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          setIsLogin(true);
          setEmail("");
          setPassword("");
          setConfirmPassword("");
        }, 3000);
      } else {
        const msg = await response.text();
        alert(msg + " ❌");
      }
    } catch (error) {
      console.error(error);
      alert("Error connecting to server ❌");
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill all fields ❌");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match ❌");
      return;
    }
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        setResetSuccess(true);
        setTimeout(() => {
          setResetSuccess(false);
          setIsReset(false);
          setIsLogin(true);
          setEmail("");
          setPassword("");
          setConfirmPassword("");
        }, 3000);
      } else {
        const msg = await response.text();
        alert(msg + " ❌");
      }
    } catch (error) {
      console.error(error);
      alert("Error connecting to server ❌");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#0F172A] text-white">

      <div className="bg-white/5 backdrop-blur-xl p-10 rounded-2xl border border-white/10 shadow-xl w-full max-w-md">

        <h1 className="text-3xl font-bold mb-8 text-center">
          {isReset ? "Reset Password" : `Carbon Intelligence ${isLogin ? "Login" : "Signup"}`}
        </h1>

        {showLoginSuccess ? (
          <div className="flex flex-col items-center justify-center space-y-6 py-10 transition-all duration-500 transform scale-100">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-400 opacity-20 blur-xl rounded-full"></div>
              <div className="w-24 h-24 bg-blue-500/20 border border-blue-500/50 rounded-full flex items-center justify-center animate-bounce">
                <CheckCircle className="w-14 h-14 text-blue-400" />
              </div>
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-white tracking-wide">Welcome Back!</h2>
              <p className="text-gray-400">Securely loading dashboard...</p>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-1 mt-6 overflow-hidden">
              <div className="bg-blue-500 h-1 rounded-full transition-all duration-[2000ms] w-full ease-linear" style={{ animation: "progress2 2s linear" }}></div>
            </div>
            <style>{`
              @keyframes progress2 {
                0% { width: 0%; }
                100% { width: 100%; }
              }
            `}</style>
          </div>
        ) : showSuccess ? (
          <div className="flex flex-col items-center justify-center space-y-6 py-10 transition-all duration-500 transform scale-100">
            <div className="relative">
              <div className="absolute inset-0 bg-green-400 opacity-20 blur-xl rounded-full"></div>
              <div className="w-24 h-24 bg-green-500/20 border border-green-500/50 rounded-full flex items-center justify-center animate-bounce">
                <CheckCircle className="w-14 h-14 text-green-400 animate-pulse" />
              </div>
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-white tracking-wide">Signup Successful!</h2>
              <p className="text-gray-400">Taking you to the login screen...</p>
            </div>
            {/* Progress Bar Animation */}
            <div className="w-full bg-gray-800 rounded-full h-1 mt-6 overflow-hidden">
              <div className="bg-green-500 h-1 rounded-full transition-all duration-[3000ms] w-full ease-linear" style={{ animation: "progress 3s linear" }}></div>
            </div>
            <style>{`
              @keyframes progress {
                0% { width: 0%; }
                100% { width: 100%; }
              }
            `}</style>
          </div>
        ) : resetSuccess ? (
          <div className="flex flex-col items-center justify-center space-y-6 py-10 transition-all duration-500 transform scale-100">
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-400 opacity-20 blur-xl rounded-full"></div>
              <div className="w-24 h-24 bg-yellow-500/20 border border-yellow-500/50 rounded-full flex items-center justify-center animate-bounce">
                <CheckCircle className="w-14 h-14 text-yellow-400 animate-pulse" />
              </div>
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-white tracking-wide">Password Reset!</h2>
              <p className="text-gray-400">Taking you back to login...</p>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-1 mt-6 overflow-hidden">
              <div className="bg-yellow-500 h-1 rounded-full transition-all duration-[3000ms] w-full ease-linear" style={{ animation: "progress 3s linear" }}></div>
            </div>
          </div>
        ) : isReset ? (
          <form
            onSubmit={handleReset}
            className="space-y-5 animate-in slide-in-from-bottom-8 fade-in duration-500"
          >
            <div className="flex flex-col items-center text-center pb-2">
              <div className="p-3 bg-yellow-500/10 rounded-full mb-3">
                <Lock className="w-7 h-7 text-yellow-500" />
              </div>
              <p className="text-gray-300 text-sm">
                Enter your email and your desired new password to securely update your account.
              </p>
            </div>

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-[#0F172A] border border-gray-700 rounded-lg focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition"
            />

            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-[#0F172A] border border-gray-700 rounded-lg focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition"
            />

            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 bg-[#0F172A] border border-gray-700 rounded-lg focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition"
            />

            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-[#0F172A] p-3 rounded-lg font-bold transition shadow-lg shadow-yellow-500/20 mt-2"
            >
              Reset Password
            </button>
          </form>
        ) : (
          <form
            onSubmit={isLogin ? handleLogin : handleSignup}
            className="space-y-5 animate-in zoom-in-95 fade-in duration-300"
          >
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-[#0F172A] border border-gray-700 rounded-lg focus:outline-none focus:border-green-500 transition"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-[#0F172A] border border-gray-700 rounded-lg focus:outline-none focus:border-green-500 transition"
            />

            {!isLogin && (
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 bg-[#0F172A] border border-gray-700 rounded-lg focus:outline-none focus:border-green-500 transition"
              />
            )}

            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 p-3 rounded-lg font-semibold transition"
            >
              {isLogin ? "Login" : "Signup"}
            </button>
          </form>
        )}

        {/* Toggle Login / Signup / Reset */}
        <div className="mt-6 text-xs text-gray-400 flex justify-between px-1">
          {!isReset ? (
            <>
              <div
                className="cursor-pointer hover:text-white"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Don't have an account? Signup" : "Already have an account? Login"}
              </div>
              {isLogin && (
                <div
                  className="cursor-pointer hover:text-white underline mx-2"
                  onClick={() => setIsReset(true)}
                >
                  Forgot Password?
                </div>
              )}
            </>
          ) : (
            <div
              className="cursor-pointer hover:text-white w-full text-center underline"
              onClick={() => setIsReset(false)}
            >
              Back to Login
            </div>
          )}
        </div>

        {/* Demo Credentials Display */}
        {isLogin && (
          <div className="mt-6 text-xs text-gray-400 text-center">
            Demo Credentials:<br />
            admin@carbonai.com / 123456
          </div>
        )}

      </div>

    </div>
  );
}
