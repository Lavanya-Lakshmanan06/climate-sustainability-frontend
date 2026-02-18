import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login/Signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  // Temporary in-memory "user database"
  const [users, setUsers] = useState([
    { email: "admin@carbonai.com", password: "123456" },
  ]);

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/");
    } else {
      alert("Invalid Credentials ❌");
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill all fields ❌");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match ❌");
      return;
    }
    if (users.find((u) => u.email === email)) {
      alert("User already exists ❌");
      return;
    }
    setUsers([...users, { email, password }]);
    alert("Signup successful ✅ You can now login.");
    setIsLogin(true);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#0F172A] text-white">

      <div className="bg-white/5 backdrop-blur-xl p-10 rounded-2xl border border-white/10 shadow-xl w-full max-w-md">

        <h1 className="text-3xl font-bold mb-8 text-center">
          Carbon Intelligence {isLogin ? "Login" : "Signup"}
        </h1>

        <form
          onSubmit={isLogin ? handleLogin : handleSignup}
          className="space-y-5"
        >
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-[#0F172A] border border-gray-700 rounded-lg"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-[#0F172A] border border-gray-700 rounded-lg"
          />

          {!isLogin && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 bg-[#0F172A] border border-gray-700 rounded-lg"
            />
          )}

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 p-3 rounded-lg font-semibold transition"
          >
            {isLogin ? "Login" : "Signup"}
          </button>
        </form>

        {/* Toggle Login / Signup */}
        <div
          className="mt-6 text-xs text-gray-400 text-center cursor-pointer hover:text-white"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Don't have an account? Signup"
            : "Already have an account? Login"}
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
