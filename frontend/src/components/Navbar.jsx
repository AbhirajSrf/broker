import React, { useState } from "react";
import { FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  console.log(authUser); // 👈 Check browser console, then remove this line

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Favourites", path: "/favourites" },
  ];

  const isActive = (path) => location.pathname === path;

  const displayName =
    authUser?.name ||
    authUser?.userName ||
    authUser?.username ||
    authUser?.fullName ||
    "User";
  const displayRole = authUser?.role || "buyer";

  return (
    <>
      {/* Main bar */}
      <div className="flex items-center justify-between px-6 py-4 shadow-md bg-white relative z-50">
        {/* User info */}
        <div>
          <h1 className="text-lg font-bold">{displayName}</h1>
          <h2 className="text-sm text-blue-600 capitalize">{displayRole}</h2>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <h2
              key={link.path}
              onClick={() => navigate(link.path)}
              className={`cursor-pointer transition-colors font-medium ${
                isActive(link.path)
                  ? "text-blue-600 border-b-2 border-blue-600 pb-0.5"
                  : "text-gray-600 hover:text-blue-500"
              }`}
            >
              {link.label}
            </h2>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 text-red-500 hover:text-red-700 transition-colors"
          >
            <FiLogOut size={20} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>

        {/* Hamburger — mobile only */}
        <button
          className="md:hidden text-gray-700 z-50"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
        </button>
      </div>

      {/* Full screen overlay — mobile only */}
      {menuOpen && (
        <div className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center gap-8 md:hidden">
          {/* User info at top */}
          <div className="absolute top-6 left-6">
            <h1 className="text-lg font-bold">{displayName}</h1>
            <h2 className="text-sm text-blue-600 capitalize">{displayRole}</h2>
          </div>

          {/* Close button */}
          <button
            className="absolute top-5 right-6 text-gray-700"
            onClick={() => setMenuOpen(false)}
          >
            <FiX size={26} />
          </button>

          {/* Nav links */}
          {navLinks.map((link) => (
            <h2
              key={link.path}
              onClick={() => {
                navigate(link.path);
                setMenuOpen(false);
              }}
              className={`text-2xl font-medium cursor-pointer transition-colors ${
                isActive(link.path)
                  ? "text-blue-600 underline underline-offset-4"
                  : "text-gray-700 hover:text-blue-500"
              }`}
            >
              {link.label}
            </h2>
          ))}

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-500 hover:text-red-700 transition-colors mt-4"
          >
            <FiLogOut size={22} />
            <span className="text-xl font-medium">Logout</span>
          </button>
        </div>
      )}
    </>
  );
};

export default Navbar;
