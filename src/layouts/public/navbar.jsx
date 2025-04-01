import { Moon, Sun, Shield } from "lucide-react";

const Navbar = ({ toggleTheme, theme }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          <span className="hidden font-bold sm:inline-block">
            SPLD - SISTEM PENDATAAN LAPORAN DAN DOKUMENTASI
          </span>
          <span className="font-bold sm:hidden">SPLD</span>
        </div>
        <nav className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="rounded-full p-2 hover:bg-muted"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
