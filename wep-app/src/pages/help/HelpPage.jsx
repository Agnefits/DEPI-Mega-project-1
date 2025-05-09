
import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const HelpPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const helpCategories = [
    { 
      title: "Getting Started", 
      articles: [
        "How to create an account",
        "Complete your profile setup", 
        "Understanding the dashboard"
      ] 
    },
    { 
      title: "Job Search", 
      articles: [
        "How to search for jobs",
        "Setting up job alerts", 
        "Saving favorite jobs"
      ] 
    },
    { 
      title: "Resume Tools", 
      articles: [
        "Uploading your resume",
        "Understanding AI feedback", 
        "Editing resume recommendations"
      ] 
    },
    { 
      title: "Interview Preparation", 
      articles: [
        "Using practice interviews",
        "Preparing for common questions", 
        "Getting feedback on responses"
      ] 
    }
  ];

  const popularArticles = [
    {
      title: "What is My Applications?",
      content: "My Applications is a way for you to track jobs as you move through the application process. Depending on the job you applied to, you may also receive notifications indicating that an application has been actioned by an employer."
    },
    {
      title: "How to access my applications history",
      content: "To access applications history, go to your My Applications page on your dashboard profile. You must be signed in to your JobHuntly account to view this page."
    },
    {
      title: "Not seeing jobs you applied in your my application list?",
      content: "Please note that we are unable to track materials submitted for jobs you apply to via an employer's site. As a result, these applications are not recorded in the My Applications section of your JobHuntly account. We suggest keeping a personal record of all positions you have applied to externally."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header isAuthenticated={true} />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/4">
              <div className="mb-6">
                <Input
                  type="text"
                  placeholder="Type your question or search keyword"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div className="space-y-8">
                <div>
                  <h3 className="font-semibold text-lg mb-3">Getting Started</h3>
                  <ul className="space-y-2">
                    <li>
                      <a href="#" className="text-gray-600 hover:text-jobblue">My Profile</a>
                    </li>
                    <li>
                      <a href="#" className="text-gray-600 hover:text-jobblue">Applying for a job</a>
                    </li>
                    <li>
                      <a href="#" className="text-gray-600 hover:text-jobblue">Job Search Tips</a>
                    </li>
                    <li>
                      <a href="#" className="text-gray-600 hover:text-jobblue">Job Alerts</a>
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-lg p-5">
                  <h3 className="font-semibold text-lg mb-3">Didn't find what you were looking for?</h3>
                  <p className="text-sm text-gray-600 mb-4">Contact our customer service</p>
                  <a href="/help/contact">
                    <Button variant="outline" className="w-full">Contact Us</Button>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="md:w-3/4">
              <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-6">Sort by: Most relevant</h2>
                
                <div className="space-y-8">
                  {popularArticles.map((article, index) => (
                    <div key={index} className="border-b pb-6">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-lg font-semibold">{article.title}</h3>
                        <button className="text-gray-400">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <circle cx="12" cy="12" r="1"></circle>
                            <circle cx="19" cy="12" r="1"></circle>
                            <circle cx="5" cy="12" r="1"></circle>
                          </svg>
                        </button>
                      </div>
                      <p className="text-gray-600 mb-4">{article.content}</p>
                      <div className="flex gap-2">
                        <p className="text-sm">Was this article helpful?</p>
                        <button className="inline-flex items-center text-sm text-gray-600 hover:text-jobblue">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                          </svg>
                          Yes
                        </button>
                        <button className="inline-flex items-center text-sm text-gray-600 hover:text-jobblue">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path>
                          </svg>
                          No
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HelpPage;
