import { Outlet } from "react-router-dom";
import Footer from "./footer";
import Navbar from "./navbar";
import { useTheme } from "@/components/theme-provider";

const PublicLayout = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div>
      <div className={`min-h-screen ${theme === "dark" ? "dark" : ""}`}>
        <div className="min-h-screen bg-background text-foreground">
          <Navbar toggleTheme={toggleTheme} theme={theme} />
          <main className="container mx-auto px-4 py-8">
            <Outlet />
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PublicLayout;
