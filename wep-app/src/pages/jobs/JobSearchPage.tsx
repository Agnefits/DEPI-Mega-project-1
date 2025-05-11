
import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import JobList from "@/components/jobs/JobList";
import { Dialog } from "@/components/ui/dialog";
import { AIInfoModal, AILoadingModal } from "@/components/jobs/AIModal";
import SuccessModal from "@/components/jobs/SuccessModal";
import { useLocation } from "react-router-dom";

const JobSearchPage = () => {
  const location = useLocation();
  const triggerAI = location.state?.triggerAI;

  const [isAIInfoOpen, setIsAIInfoOpen] = useState(false);
  const [isAILoadingOpen, setIsAILoadingOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [showAIResults, setShowAIResults] = useState(false);

  const handleTryNow = () => {
    setIsAIInfoOpen(true);
  };

  const handleGetSuggestions = () => {
    setIsAIInfoOpen(false);
    setIsAILoadingOpen(true);

    // Simulate loading time
    setTimeout(() => {
      setIsAILoadingOpen(false);
      setShowAIResults(true);
    }, 2000);
  };

  useEffect(() => {
    if (triggerAI) {
      handleTryNow();
    }
  }, [triggerAI]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-white">
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Your Next Job, Just a <span className="text-jobblue">Click Away</span>
            </h1>
            <p className="text-gray-600 mb-8">Find Your Next Role at Companies You Admire</p>
            
            <div className="bg-white p-3 rounded-lg shadow-sm flex items-center space-x-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Job title or keyword"
                  className="w-full pl-10 pr-4 py-2.5 rounded-md border-gray-200 focus:border-jobblue focus:ring-jobblue"
                />
                <span className="absolute left-3 top-3 text-gray-400">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </span>
              </div>
              
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Cairo, Egypt"
                  className="w-full pl-10 pr-4 py-2.5 rounded-md border-gray-200 focus:border-jobblue focus:ring-jobblue"
                />
                <span className="absolute left-3 top-3 text-gray-400">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <span className="absolute right-3 top-3 text-gray-400">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </span>
              </div>
              
              <button className="bg-jobblue text-white px-6 py-2.5 rounded-md hover:bg-blue-700 transition">
                Search
              </button>
            </div>
            
            <div className="mt-4 text-sm">
              <span className="text-gray-600">Popular: </span>
              <span className="text-gray-800">UI Designer, UX Researcher, Admin, Graphic Designer</span>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">or</p>
              <h2 className="text-2xl font-bold mb-4">
                Let <span className="text-jobblue">JobGenius</span> AI Find Your Perfect Job Fit
              </h2>
              <button 
                onClick={handleTryNow}
                className="bg-jobblue text-white px-6 py-2.5 rounded-md hover:bg-blue-700 transition"
              >
                Try Now
              </button>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          {showAIResults ? (
            <>
              <h2 className="text-2xl font-bold mb-4">
                JobGenius <span className="text-jobblue">AI:</span> Smart Job Suggestions Just <span className="text-jobblue">for You!</span>
              </h2>
              <JobList type="ai" title="" showFilter={false} />
            </>
          ) : null}
        </div>
      </main>
      
      <Dialog open={isAIInfoOpen} onOpenChange={setIsAIInfoOpen}>
        <AIInfoModal onSubmit={handleGetSuggestions} />
      </Dialog>

      <Dialog open={isAILoadingOpen} onOpenChange={setIsAILoadingOpen}>
        <AILoadingModal />
      </Dialog>

      <Dialog open={isSuccessOpen} onOpenChange={setIsSuccessOpen}>
        <SuccessModal 
          title="Success! Your job Request sent."
          subtitle="We will be in touch soon!"
          onClose={() => setIsSuccessOpen(false)}
        />
      </Dialog>

      <Footer />
    </div>
  );
};

export default JobSearchPage;
