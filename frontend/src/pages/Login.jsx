import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [formData, setFormData] = useState({ userName: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  const inputCls =
    "w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-zinc-100 " +
    "placeholder-zinc-500 focus:outline-none focus:border-amber-400 focus:ring-1 " +
    "focus:ring-amber-400/30 transition-colors duration-150";

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      {/* Ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden">
          <div className="px-8 py-8">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-7">
              <div className="w-7 h-7 rounded-full bg-amber-400 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-900" />
              </div>
              <span className="text-zinc-100 font-semibold tracking-tight text-lg">
                YourApp
              </span>
            </div>

            <h1 className="text-2xl font-bold text-zinc-50 tracking-tight">
              Welcome back
            </h1>
            <p className="text-zinc-500 text-sm mt-1 mb-7">
              Sign in to continue to your account.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username */}
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                  Username
                </label>
                <input
                  type="text"
                  value={formData.userName}
                  onChange={(e) =>
                    setFormData({ ...formData, userName: e.target.value })
                  }
                  placeholder="your_username"
                  className={inputCls}
                  autoComplete="username"
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Password
                  </label>
                  <button
                    type="button"
                    className="text-xs text-zinc-500 hover:text-amber-400 transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    placeholder="••••••••"
                    className={`${inputCls} pr-10`}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-amber-400 transition-colors"
                  >
                    {showPassword ? (
                      <FaEyeSlash size={14} />
                    ) : (
                      <FaEye size={14} />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full bg-amber-400 hover:bg-amber-300 disabled:opacity-50 disabled:cursor-not-allowed
                           text-zinc-900 font-bold py-2.5 rounded-lg text-sm transition-all duration-150
                           active:scale-[0.98] flex items-center justify-center gap-2 mt-2"
              >
                {isLoggingIn ? (
                  <>
                    <span className="w-4 h-4 border-2 border-zinc-700 border-t-zinc-900 rounded-full animate-spin" />
                    Signing in…
                  </>
                ) : (
                  "Sign in"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-zinc-800" />
              <span className="text-zinc-600 text-xs">or</span>
              <div className="flex-1 h-px bg-zinc-800" />
            </div>

            {/* Register link */}
            <p className="text-center text-sm text-zinc-500">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-amber-400 font-semibold hover:text-amber-300 transition-colors"
              >
                Create one
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-zinc-600 text-xs mt-5">
          By continuing you agree to our{" "}
          <span className="text-zinc-500 hover:text-amber-400 cursor-pointer transition-colors">
            Terms
          </span>{" "}
          &{" "}
          <span className="text-zinc-500 hover:text-amber-400 cursor-pointer transition-colors">
            Privacy Policy
          </span>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;
