
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SettingsSidebar from "@/components/settings/SettingsSidebar";

const AccountPage = () => {
  const [applications, setApplications] = useState([
    {
      id: 1,
      company: "Nomad",
      companyLogo: "/lovable-uploads/987379b5-72ac-48ba-afa1-22296550038b.png",
      position: "Social Media Assistant",
      date: "24 July 2021",
      status: "In Review"
    },
    {
      id: 2,
      company: "Udacity",
      companyLogo: "/lovable-uploads/ddcd7974-ec8e-4eb8-a5c0-441ccc1e9163.png",
      position: "Social Media Assistant",
      date: "20 July 2021",
      status: "Shortlisted"
    },
    {
      id: 3,
      company: "Packer",
      companyLogo: "/lovable-uploads/789de2eb-02d1-47bf-86b7-19eba0ee1426.png",
      position: "Social Media Assistant",
      date: "16 July 2021",
      status: "Offered"
    },
    {
      id: 4,
      company: "Divvy",
      companyLogo: "/lovable-uploads/a976ced2-cde5-464b-88fb-facc67af500c.png",
      position: "Social Media Assistant",
      date: "14 July 2021",
      status: "Offered"
    },
    {
      id: 5,
      company: "DigitalOcean",
      companyLogo: "/lovable-uploads/0da22128-2323-41c9-b6fc-2a5371073935.png",
      position: "Social Media Assistant",
      date: "10 July 2021",
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
            <h1 className="text-4xl font-bold">My Applications</h1>
            <Button variant="outline" className="bg-white" asChild>
              <a href="/">Back to homepage</a>
            </Button>
          </div>
          
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Keep it up, Ahmed</h2>
            <p className="text-gray-600">Here is job applications status from July 19 - July 25.</p>
          </div>
          
          <div className="mb-8 flex space-x-4">
            <button className="px-4 py-2 border-b-2 border-jobblue text-jobblue font-medium">
              All (45)
            </button>
            <button className="px-4 py-2 border-b-2 border-transparent hover:border-gray-300 text-gray-600">
              In Review (34)
            </button>
            <button className="px-4 py-2 border-b-2 border-transparent hover:border-gray-300 text-gray-600">
              Assessment (5)
            </button>
            <button className="px-4 py-2 border-b-2 border-transparent hover:border-gray-300 text-gray-600">
              Offered (2)
            </button>
            <button className="px-4 py-2 border-b-2 border-transparent hover:border-gray-300 text-gray-600">
              Hired (1)
            </button>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Applications History</h3>
              <div className="flex gap-2">
                <Button variant="outline" className="flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Search
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 4H21" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 12H17" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 20H14" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Filter
                </Button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg border overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Applied</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {applications.map((app) => (
                    <tr key={app.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full overflow-hidden">
                            <img src={app.companyLogo} alt={app.company} className="h-full w-full object-contain" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{app.company}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{app.position}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{app.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span 
                          className={`px-3 py-1 inline-flex text-sm leading-5 font-medium rounded-full ${
                            app.status === "In Review" ? "bg-yellow-100 text-yellow-800" :
                            app.status === "Shortlisted" ? "bg-blue-100 text-blue-800" :
                            app.status === "Offered" ? "bg-indigo-100 text-indigo-800" :
                            app.status === "Declined" ? "bg-red-100 text-red-800" :
                            "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {app.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="flex-1 flex justify-between sm:hidden">
                  <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Previous
                  </a>
                  <a href="#" className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Next
                  </a>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <span className="sr-only">Previous</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </a>
                      <a href="#" aria-current="page" className="z-10 bg-jobblue border-jobblue text-white relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                        1
                      </a>
                      <a href="#" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                        2
                      </a>
                      <a href="#" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                        3
                      </a>
                      <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                        ...
                      </span>
                      <a href="#" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                        33
                      </a>
                      <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <span className="sr-only">Next</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AccountPage;
