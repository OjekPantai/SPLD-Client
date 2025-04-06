import { Link } from "react-router-dom";
import { Bell, Menu, Moon, Search, Shield, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import NavDropdown from "./NavDropdown";
import MobileMenu from "./MobileMenu";

export function TopNavbar({
  user,
  navigationItems,
  isActive,
  theme,
  setTheme,
  isMounted,
  handleLogout,
}) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm h-16">
      <div className="flex h-16 items-center justify-between px-4 w-full">
        <div className="flex items-center gap-4">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <MobileMenu
              user={user}
              navigationItems={navigationItems}
              isActive={isActive}
            />
          </Sheet>

          {/* Desktop Logo */}
          <Link to="/admin" className="hidden md:flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full  flex items-center justify-center">
              <span className="text-primary font-bold">
                <Shield className="h-6 w-6 text-primary" />
              </span>
            </div>
            <span className="font-bold text-xl">SPLD</span>
          </Link>
        </div>

        {/* Search Bar - Desktop Only */}
        {/* <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="w-full pl-10 h-9 bg-muted/50"
            />
          </div>
        </div> */}

        {/* Navbar Right Items */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive"></span>
            <span className="sr-only">Notifications</span>
          </Button>

          {/* Theme Toggle */}
          {isMounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              title={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          )}

          <NavDropdown user={user} handleLogout={handleLogout} />
        </div>
      </div>
    </header>
  );
}
