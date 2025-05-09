
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ResumeSection = () => {
  return (
    <section className="py-16 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Review Your <span className="text-jobblue">RESUME</span>
            </h2>
            <p className="text-gray-600 mb-6">
              AI-powered resume analysis tool designed to help job seekers optimize their resumes with 
              personalized insights, keyword optimization, and formatting suggestions to improve ATS 
              compatibility and boost hiring chances.
            </p>
            <Link to="/resume">
              <Button className="bg-jobblue hover:bg-jobblue-dark text-white">
                Try it Now
              </Button>
            </Link>
          </div>
          <div className="flex justify-center">
            <img
              src="/lovable-uploads/Images/image 3.png"
              alt="Resume Analysis Tool"
              className="max-w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
