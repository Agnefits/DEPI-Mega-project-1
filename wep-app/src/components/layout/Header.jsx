
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import LogoIcon from "../common/LogoIcon";
import { useUserStore } from "@/reducers/UserReducerStore";
import { LogOutIcon } from "lucide-react";

const Header = () => {
  const isAuthenticated = useUserStore.getState().isAuthenticated;
  return (
    <header className="bg-white border-b border-gray-200 py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <LogoIcon className="h-8 w-8" />
            <span className="ml-2 text-xl font-semibold">JobGenius</span>
          </Link>
          
          <nav className="hidden md:flex ml-8">
            <Link to="/jobs" className="mx-2 text-gray-700 hover:text-jobblue">Jobs Search</Link>
            <Link to="/resume" className="mx-2 text-gray-700 hover:text-jobblue">Resume Analyzer</Link>
            <Link to="/interview" className="mx-2 text-gray-700 hover:text-jobblue">Interview Preparation</Link>
            <Link to="/help" className="mx-2 text-gray-700 hover:text-jobblue">Help & Support</Link>
          </nav>
        </div>
        
        <div>
          {isAuthenticated ? (
            <div className="flex items-center">
              <Link to="/profile">
                <img
                  src="https://randomuser.me/api/portraits/men/44.jpg"
                  alt="User Avatar"
                  className="h-8 w-8 rounded-full"
                />
              </Link>
              <Button variant="outline" size="sm" className="ml-4">
                <LogOutIcon></LogOutIcon>
                Logout
              </Button>
            </div>
          ) : (
            <div className="space-x-2">
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="default" size="sm" className="bg-jobblue hover:bg-jobblue-dark">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
