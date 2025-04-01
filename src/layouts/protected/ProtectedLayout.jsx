import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Home, FileText, User, Settings, ClipboardPlus } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { Sidebar } from "@/layouts/protected/Sidebar";
import { TopNavbar } from "@/layouts/protected/TopNavbar";

const ProtectedLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  // Mock user data - in real app, this would come from your auth context
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Admin",
    avatarUrl: "", // Empty for fallback demo
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogout = () => {
    // Add your logout logic here
    navigate("/login");
  };

  const navigationItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: <Home className="w-5 h-5" />,
    },
    {
      name: "Narratives",
      path: "/admin/narratives",
      icon: <FileText className="w-5 h-5" />,
    },
    {
      name: "Reports",
      path: "/admin/reports",
      icon: <ClipboardPlus className="w-5 h-5" />,
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: <User className="w-5 h-5" />,
    },
  ];

  const isActive = (path) => {
    // Check if current path is exactly the navigation item path or starts with it (for nested routes)
    return (
      location.pathname === path ||
      (path !== "/admin" && location.pathname.startsWith(path))
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground w-full">
      <TopNavbar
        user={user}
        navigationItems={navigationItems}
        isActive={isActive}
        theme={theme}
        setTheme={setTheme}
        isMounted={isMounted}
        handleLogout={handleLogout}
      />

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Fixed Sidebar - Only visible on md and up */}
        <Sidebar
          user={user}
          navigationItems={navigationItems}
          isActive={isActive}
          handleLogout={handleLogout}
        />

        {/* Page Content - With left margin to account for fixed sidebar */}
        <main className="flex-1 w-full md:ml-64 overflow-auto">
          <div className="p-4 md:p-6 w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProtectedLayout;
