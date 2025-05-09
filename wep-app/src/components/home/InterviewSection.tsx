
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const InterviewSection = () => {
  return (
    <section className="py-16 bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="order-1 md:order-2 flex justify-center">
            <img
              src="/lovable-uploads/Images/image 4.png"
              alt="Interview Simulation"
              className="max-w-full"
            />
          </div>
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Simulate Your <span className="text-jobblue">Interview</span>
            </h2>
            <p className="text-gray-600 mb-6">
              AI-driven interview platform that offers smart question generation, real-time feedback, and 
              personalized coaching to help candidates prepare confidently and perform better in job 
              interviews.
            </p>
            <Link to="/interview">
              <Button className="bg-jobblue hover:bg-jobblue-dark text-white">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InterviewSection;
