import { Link } from "react-router-dom";
import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toCapitalize } from "@/lib/utils";

export function NavDropdown({ user, handleLogout }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-9 flex items-center gap-2 px-2 rounded-full hover:bg-accent"
        >
          <Avatar className="h-8 w-8 border-2 border-muted">
            <AvatarImage
              src={user.avatarUrl}
              alt={toCapitalize(toCapitalize(user.name))}
            />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {toCapitalize(user.name).charAt(0)}
              {toCapitalize(user.name).split(" ")[1]?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span className="hidden md:inline-flex text-sm font-medium">
            {toCapitalize(user.name)}
          </span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 p-2">
        <div className="flex items-center gap-4 p-2">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatarUrl} alt={toCapitalize(user.name)} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {toCapitalize(user.name).charAt(0)}
              {toCapitalize(user.name).split(" ")[1]?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col space-y-0.5">
            <p className="text-sm font-medium">{toCapitalize(user.name)}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
            <Badge variant="outline" className="w-fit text-xs mt-1">
              {toCapitalize(user.role)}
            </Badge>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="flex items-center gap-2 py-2">
          <Link to="/admin/profile" className="cursor-pointer">
            <User className="h-4 w-4 mr-2" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="flex items-center gap-2 py-2">
          <Link to="/admin/settings" className="cursor-pointer">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive focus:text-destructive cursor-pointer py-2"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default NavDropdown;
