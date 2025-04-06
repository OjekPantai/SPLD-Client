import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function MobileMenu({ user, navigationItems, isActive }) {
  return (
    <SheetContent side="left" className="w-72 p-0">
      <div className="border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/admin" className="flex items-center">
            <span className="font-bold text-xl">SPLD</span>
          </Link>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <X className="h-5 w-5" />
            </Button>
          </SheetTrigger>
        </div>
      </div>
      <ScrollArea className="h-[calc(100vh-8rem)] pb-10">
        <div className="flex flex-col space-y-1 p-2">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center justify-between rounded-md px-4 py-3 text-sm font-medium transition-colors
                ${
                  isActive(item.path)
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent hover:text-accent-foreground"
                }`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                {item.name}
              </div>
              {item.badge && (
                <Badge variant="secondary" className="ml-auto">
                  {item.badge}
                </Badge>
              )}
            </Link>
          ))}
        </div>
      </ScrollArea>
      <div className="border-t p-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-9 w-9">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {user.name.charAt(0)}
              {user.name.split(" ")[1]?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{user.name}</span>
            <span className="text-xs text-muted-foreground">{user.role}</span>
          </div>
        </div>
      </div>
    </SheetContent>
  );
}

export default MobileMenu;
