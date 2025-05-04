// frontend/src/components/ui/AdminLayout.tsx
import React from "react";
import { Link, useLocation,useNavigate } from "react-router-dom";
import { SignOutButton } from "@clerk/clerk-react";

const navItems = [
  { to: "/admin/dashboard", label: "Dashboard" },
  { to: "/admin/users", label: "Users" },
  { to: "/admin/settings", label: "Settings" },
];

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate(); // Add this hook
  const handleSignOut = () => {
    navigate('/'); // Redirect to home page after sign out
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col">
        {/* <h2 className="text-xl font-bold mb-8 gray ">Admin Panel</h2> */}
        <h2 className="text-2xl font-extrabold mb-8 text-purple-700">Admin Panel</h2>
        <nav className="flex-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`block px-4 py-2 mb-2 rounded-lg ${
                pathname === item.to
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto">
        <SignOutButton signOutCallback={handleSignOut}>
        <button className="w-full text-left px-4 py-2 text-blue-600 hover:bg-gray-100 rounded-lg">
              Sign Out
            </button>
          </SignOutButton>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-purple-700">Admin</h1>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
