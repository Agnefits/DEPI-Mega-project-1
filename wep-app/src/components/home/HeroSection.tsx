
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState } from "react";
import { useJobStore } from "@/reducers/JobListingReducerStore";
const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("Cairo, Egypt");
  const {searchJobs} = useJobStore();
  const handleSearch = () => {
    const [city, country] = location.split(',').map(str => str.trim());
    searchJobs(searchQuery, country, city);
  };
  return (
    <section className="hero-gradient pt-14 pb-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
              Find Your <span className="text-gray-700">Dream Job</span> <br />
              Faster <span className="text-jobblue">with <br/> JobGenius</span>
            </h1>
            <p className="text-gray-600 mt-6 mb-8 max-w-lg">
              A smart platform that connects job seekers with leading employers and top career
              opportunities, featuring AI-powered resume analysis and interview preparation tools.
            </p>
            
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Job title or keyword"
                    className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-jobblue focus:border-transparent"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="relative flex-grow">
                  <div className="absolute left-3 top-3 h-5 w-5 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div className="flex items-center w-full">
                    <input
                      type="text"
                      placeholder="Location"
                      className="w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-jobblue focus:border-transparent"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                    <div className="absolute right-3">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
                        <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <Button className="bg-jobblue hover:bg-jobblue-dark text-white font-medium px-6" onClick={handleSearch}>
                  Search
                </Button>
              </div>
            </div>
          </div>
          
          <div className="hidden md:block">
            <img 
              src="/lovable-uploads/Images/image_1.png" 
              alt="Job seeker illustration" 
              className="max-w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
