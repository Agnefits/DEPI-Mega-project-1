
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ResumeUploader from "@/components/resume/ResumeUploader";
import ResumeRecommendations from "@/components/resume/ResumeRecommendations";

const ResumeHowItWorksPage = () => {
  const handleUpload = (name: string) => {
    console.log(`File uploaded: ${name}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header isAuthenticated={true} />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-8">How it works</h2>
          
          <div className="grid md:grid-cols-2 gap-10 mb-8">
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="text-jobblue flex-shrink-0">
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
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-jobblue">Upload Your Resume</h3>
                  <p className="text-gray-600">Upload your resume in PDF or DOCX format for AI analysis.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-jobblue flex-shrink-0">
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
                    <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-jobblue">AI Analysis</h3>
                  <p className="text-gray-600">The tool evaluates keywords, formatting, and content for ATS compatibility.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-jobblue flex-shrink-0">
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
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-jobblue">Personalized Insights</h3>
                  <p className="text-gray-600">Get an ATS score, keyword suggestions, and formatting tips to enhance readability and impact.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-jobblue flex-shrink-0">
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
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-jobblue">Optimize & Finalize</h3>
                  <p className="text-gray-600">Edit your resume using AI-driven recommendations and re-check for improvements.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-jobblue flex-shrink-0">
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
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" x2="12" y1="15" y2="3" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-jobblue">Download & Apply</h3>
                  <p className="text-gray-600">Save your optimized resume and apply with confidence.</p>
                </div>
              </div>
            </div>

            <div className="hidden md:block">
              <img
                src="/lovable-uploads/858e9e1f-1814-4d51-bf15-67eaadc0b99a.png"
                alt="Resume Analysis Tool"
                className="max-w-full h-auto"
              />
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-8">
            Upload Your <span className="text-jobblue">Resume:</span>
          </h2>
          <ResumeUploader onUpload={handleUpload} />

          <div className="mt-10">
            <Button className="bg-jobblue hover:bg-jobblue-dark text-white">
              Optimize Now!
            </Button>
          </div>

          <div className="mt-16">
            <ResumeRecommendations />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ResumeHowItWorksPage;
