
import { Link } from "react-router-dom";
import { Settings, HelpCircle, LogOut } from "lucide-react";
import LogoIcon from "@/components/common/LogoIcon";

const SettingsSidebar = () => {
  return (
    <aside className="bg-[#f5f9ff] w-60 min-w-60 border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <Link to="/" className="flex items-center">
          <LogoIcon className="h-8 w-8" />
          <span className="ml-2 text-xl font-semibold">JobGenius</span>
        </Link>
      </div>
      
      <nav className="flex-1 p-4">
        <div className="mb-2">
          <Link to="/overview" className="flex items-center py-2 px-3 text-gray-700 hover:bg-blue-50 rounded-md">
            <span className="w-6 h-6 mr-3 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="7" height="7" rx="1" stroke="#000000" strokeWidth="1.5"/>
                <rect x="3" y="14" width="7" height="7" rx="1" stroke="#000000" strokeWidth="1.5"/>
                <rect x="14" y="3" width="7" height="7" rx="1" stroke="#000000" strokeWidth="1.5"/>
                <rect x="14" y="14" width="7" height="7" rx="1" stroke="#000000" strokeWidth="1.5"/>
              </svg>
            </span>
            overview
          </Link>
          
          <Link to="/applications" className="flex items-center py-2 px-3 text-gray-700 hover:bg-blue-50 rounded-md">
            <span className="w-6 h-6 mr-3 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 9L19 17C19 18.8856 19 19.8284 18.4142 20.4142C17.8284 21 16.8856 21 15 21L9 21C7.11438 21 6.17157 21 5.58579 20.4142C5 19.8284 5 18.8856 5 17L5 7C5 5.11438 5 4.17157 5.58579 3.58579C6.17157 3 7.11438 3 9 3L13 3" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M9 7L15 7" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M9 11L15 11" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M9 15L13 15" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </span>
            My Applications
          </Link>
          
          <Link to="/saved-jobs" className="flex items-center py-2 px-3 text-gray-700 hover:bg-blue-50 rounded-md">
            <span className="w-6 h-6 mr-3 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 3H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V5C19 3.89543 18.1046 3 17 3Z" stroke="#000000" strokeWidth="1.5"/>
                <path d="M9 7H15" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M9 11H15" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M9 15H13" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </span>
            Saved Jobs
          </Link>
          
          <Link to="/profile" className="flex items-center py-2 px-3 text-gray-700 hover:bg-blue-50 rounded-md">
            <span className="w-6 h-6 mr-3 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="8" r="4" stroke="#000000" strokeWidth="1.5"/>
                <path d="M5 20C5 16.6863 8.13401 14 12 14C15.866 14 19 16.6863 19 20" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </span>
            My Profile
          </Link>
        </div>
        
        <div className="mt-8">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">
            SETTINGS
          </h3>
          
          <Link to="/settings" className="flex items-center py-2 px-3 bg-blue-100 text-jobblue rounded-md">
            <span className="w-6 h-6 mr-3 flex items-center justify-center">
              <Settings size={20} />
            </span>
            Settings
          </Link>
          
          <Link to="/help" className="flex items-center py-2 px-3 text-gray-700 hover:bg-blue-50 rounded-md">
            <span className="w-6 h-6 mr-3 flex items-center justify-center">
              <HelpCircle size={20} />
            </span>
            Help Center
          </Link>
        </div>
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center mb-4">
          <img 
            src="https://randomuser.me/api/portraits/men/44.jpg"
            alt="User Avatar" 
            className="h-10 w-10 rounded-full mr-3" 
          />
          <div>
            <p className="font-semibold">Ahmed Safwat</p>
            <p className="text-sm text-gray-500">a.safwat@gmail.com</p>
          </div>
        </div>
        
        <button className="flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
          <LogOut size={18} className="mr-2" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default SettingsSidebar;
