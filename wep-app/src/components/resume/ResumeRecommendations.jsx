
import { Button } from "@/components/ui/button";

const ResumeRecommendations = () => {
  return (
    <div className="mt-16">
      <div className="flex items-center mb-6">
        <h2 className="text-2xl font-bold">
          JobGenius <span className="text-jobblue">AI Recommendations:</span>
        </h2>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex gap-2">
            <span className="font-bold">1.</span>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="flex gap-2">
            <span className="font-bold">2.</span>
            <p>Quisque lobortis facilisis orci non volutpat.</p>
          </div>
          <div className="flex gap-2">
            <span className="font-bold">3.</span>
            <p>elit et fringilla auctor, lectus magna placerat.</p>
          </div>
          <div className="flex gap-2">
            <span className="font-bold">4.</span>
            <p>dictum elit eget, eleifend odio. Vestibulum ante ipsum.</p>
          </div>
          <div className="flex gap-2">
            <span className="font-bold">5.</span>
            <p>Proin vitae augue nisi. Integer imperdiet.</p>
          </div>
        </div>
        
        <div className="flex justify-center">
          <img 
            src="/lovable-uploads/Images/vector 1.png" 
            alt="Resume Analysis Visualization" 
            className="max-h-64"
          />
        </div>
      </div>
      
      <div className="flex justify-center mt-10">
        <Button className="bg-transparent hover:bg-blue-50 border border-jobblue text-jobblue px-10 gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" x2="12" y1="15" y2="3" />
          </svg>
          Download Your Improved Resume
        </Button>
      </div>
    </div>
  );
};

export default ResumeRecommendations;
