
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SettingsSidebar from "@/components/settings/SettingsSidebar";
import { Link } from "react-router-dom";

const OverviewPage = () => {
  const [dateRange, setDateRange] = useState("Jul 19 - Jul 25");
  const [recentApplications, setRecentApplications] = useState([
    {
      id: 1,
      position: "Social Media Assistant",
      company: "Nomad",
      companyLogo: "/lovable-uploads/987379b5-72ac-48ba-afa1-22296550038b.png",
      location: "Paris, France",
      type: "Full-Time",
      date: "24 July 2021",
      status: "In Review"
    },
    {
      id: 2,
      position: "Social Media Assistant",
      company: "Udacity",
      companyLogo: "/lovable-uploads/ddcd7974-ec8e-4eb8-a5c0-441ccc1e9163.png",
      location: "New York, USA",
      type: "Full-Time",
      date: "23 July 2021",
      status: "Shortlisted"
    },
    {
      id: 3,
      position: "Social Media Assistant",
      company: "Packer",
      companyLogo: "/lovable-uploads/789de2eb-02d1-47bf-86b7-19eba0ee1426.png",
      location: "Madrid, Spain",
      type: "Full-Time",
      date: "22 July 2021",
      status: "Declined"
    }
  ]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header isAuthenticated={true} />
      <div className="flex-grow flex">
        <SettingsSidebar />
        <main className="flex-grow px-8 py-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Overview</h1>
            <Button variant="outline" className="bg-white" asChild>
              <a href="/">Back to homepage</a>
            </Button>
          </div>
          
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Good morning, Ahmed</h2>
              <p className="text-gray-600">Here is what's happening with all your activity from July 19 - July 25.</p>
            </div>
            <div className="flex items-center border rounded-md p-2 bg-white">
              <span className="px-2">{dateRange}</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="6" width="18" height="15" rx="2" stroke="#000000" strokeWidth="1.5"/>
                <path d="M3 10H21" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M8 14H16" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M8 3L8 7" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M16 3L16 7" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-gray-700 mb-2">Total Jobs Applied</h3>
              <div className="flex items-center">
                <span className="text-4xl font-bold mr-3">45</span>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-300">
                  <path d="M19 9L19 17C19 18.8856 19 19.8284 18.4142 20.4142C17.8284 21 16.8856 21 15 21L9 21C7.11438 21 6.17157 21 5.58579 20.4142C5 19.8284 5 18.8856 5 17L5 7C5 5.11438 5 4.17157 5.58579 3.58579C6.17157 3 7.11438 3 9 3L13 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M9 7L15 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M9 11L15 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M9 15L13 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-gray-700 mb-2">Resume Analysis</h3>
              <div className="flex items-center">
                <span className="text-4xl font-bold mr-3">24</span>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-300">
                  <path d="M16 2V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M8 2V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M3 9H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M10.5 13L8 15.5L6.5 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10.5 17L8 19.5L6.5 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13 15H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M13 19H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5Z" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-gray-700 mb-2">Interviewed</h3>
              <div className="flex items-center">
                <span className="text-4xl font-bold mr-3">18</span>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-300">
                  <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M4.19826 18.8891C4.43018 16.6798 6.26319 15.1585 8.49941 15.3977C9.89474 15.5548 11.1992 15.6905 12.0003 15.7489C12.8015 15.6905 14.1059 15.5548 15.5012 15.3977C17.7374 15.1585 19.5705 16.6798 19.8024 18.8891C19.8941 19.7548 19.95 20.6392 20.0003 21.5H4.00034C4.05069 20.6392 4.10656 19.7548 4.19826 18.8891Z" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-gray-700 mb-2">Total Jobs Saved</h3>
              <div className="flex items-center">
                <span className="text-4xl font-bold mr-3">60</span>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-300">
                  <path d="M17.5 4.5C17.5 3.11929 16.3807 2 15 2H9C7.61929 2 6.5 3.11929 6.5 4.5V20.5C6.5 21.0523 6.94772 21.5 7.5 21.5C7.77286 21.5 8.03757 21.3878 8.2 21.2L12 16.9L15.8 21.2C15.9624 21.3878 16.2271 21.5 16.5 21.5C17.0523 21.5 17.5 21.0523 17.5 20.5V4.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Jobs Applied Status</h3>
            </div>
            <div className="flex items-center">
              <div className="w-44 h-44 relative">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#F3F4F6" strokeWidth="15" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#76A9FA" strokeWidth="15" strokeDasharray="251.2" strokeDashoffset="188.4" className="transform -rotate-90 origin-center" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#111827" strokeWidth="15" strokeDasharray="251.2" strokeDashoffset="75.36" className="transform -rotate-90 origin-center" />
                </svg>
              </div>
              <div className="ml-8">
                <div className="flex items-center mb-4">
                  <div className="w-4 h-4 bg-blue-400 rounded mr-2"></div>
                  <div>
                    <div className="font-medium">20%</div>
                    <div className="text-gray-500 text-sm">Accepted</div>
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  <div className="w-4 h-4 bg-gray-300 rounded mr-2"></div>
                  <div>
                    <div className="font-medium">50%</div>
                    <div className="text-gray-500 text-sm">In progress</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-gray-900 rounded mr-2"></div>
                  <div>
                    <div className="font-medium">30%</div>
                    <div className="text-gray-500 text-sm">No Response</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Link to="/applications" className="text-jobblue flex items-center">
                <span>View All Applications</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1">
                  <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6">Recent Applications History</h3>
            {recentApplications.map(app => (
              <div key={app.id} className="bg-white rounded-lg border p-4 mb-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden mr-4 flex items-center justify-center">
                      <img src={app.companyLogo} alt={app.company} className="w-10 h-10 object-contain" />
                    </div>
                    <div>
                      <h4 className="font-medium text-lg">{app.position}</h4>
                      <div className="text-gray-600">
                        {app.company} • {app.location} • {app.type}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="mb-2">
                      <div className="text-sm text-gray-500">Date Applied</div>
                      <div className="font-medium">{app.date}</div>
                    </div>
                    <span 
                      className={`px-3 py-1 text-sm font-medium rounded-full ${
                        app.status === "In Review" ? "bg-yellow-100 text-yellow-800" :
                        app.status === "Shortlisted" ? "bg-blue-100 text-blue-800" :
                        app.status === "Declined" ? "bg-red-100 text-red-800" :
                        "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {app.status}
                    </span>
                  </div>
                  <button className="ml-4">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 12V12.01M12 6V6.01M12 18V18.01" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
            <div className="flex justify-center mt-6">
              <Link to="/applications" className="text-jobblue flex items-center">
                <span>View all applications history</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1">
                  <path d="M13 6L19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default OverviewPage;
