
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const InterviewPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header isAuthenticated={true} />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">
            Interview <span className="text-jobblue">Preparation</span>
          </h1>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-semibold mb-6">Prepare for Success</h2>
              <p className="text-gray-600 mb-6">
                Our interview preparation tool helps you practice and refine your answers to common interview questions. 
                With AI-powered feedback, you'll be ready to impress employers and land your dream job.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <div className="bg-jobblue rounded-full p-1 text-white mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Extensive Question Library</h3>
                    <p className="text-gray-600">Access hundreds of common interview questions across industries</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-jobblue rounded-full p-1 text-white mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">AI Response Evaluation</h3>
                    <p className="text-gray-600">Get instant feedback on your practice answers</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-jobblue rounded-full p-1 text-white mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Personalized Coaching</h3>
                    <p className="text-gray-600">Receive tailored advice to improve your interview performance</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-jobblue rounded-full p-1 text-white mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Mock Interview Simulations</h3>
                    <p className="text-gray-600">Practice in realistic interview scenarios</p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <Link to="/interview/questions">
                  <Button className="bg-jobblue hover:bg-jobblue-dark text-white">
                    Start Practicing
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <img 
                src="/lovable-uploads/fa2a8727-4998-459c-a896-dcd1da4f0b9a.png" 
                alt="Interview Preparation" 
                className="max-w-full"
              />
            </div>
          </div>

          <div className="border-t border-gray-200 pt-12 mb-8">
            <h2 className="text-2xl font-semibold mb-8">Popular Interview Questions</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold mb-2">Tell me about yourself.</h3>
                <p className="text-gray-600">Learn how to structure a concise, powerful response to this common opener.</p>
              </div>
              <div className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold mb-2">What are your greatest strengths?</h3>
                <p className="text-gray-600">Discover how to highlight your skills without sounding arrogant.</p>
              </div>
              <div className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold mb-2">What is your biggest weakness?</h3>
                <p className="text-gray-600">Master the art of addressing weaknesses while showing growth.</p>
              </div>
              <div className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold mb-2">Where do you see yourself in 5 years?</h3>
                <p className="text-gray-600">Learn to discuss your ambitions while showing commitment.</p>
              </div>
            </div>
            <div className="mt-8 text-center">
              <Link to="/interview/questions">
                <Button variant="outline" className="border-jobblue text-jobblue hover:bg-blue-50">
                  View All Questions
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default InterviewPage;
