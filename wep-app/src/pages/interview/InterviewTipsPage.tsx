
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const InterviewTipsPage = () => {
  const tips = [
    {
      title: "Research the Company",
      description: "Learn about the company's mission, products, services, and recent news before your interview."
    },
    {
      title: "Practice Common Questions",
      description: "Prepare answers to frequently asked questions, using the STAR method for behavioral questions."
    },
    {
      title: "Dress Appropriately",
      description: "Choose professional attire that matches the company culture, when in doubt, dress slightly more formal."
    },
    {
      title: "Arrive Early",
      description: "Plan to arrive 10-15 minutes early to allow time for unexpected delays and to compose yourself."
    },
    {
      title: "Prepare Questions",
      description: "Have thoughtful questions ready to ask the interviewer about the role, team, and company."
    },
    {
      title: "Body Language",
      description: "Maintain eye contact, offer a firm handshake, sit up straight, and project confidence."
    },
    {
      title: "Listen Actively",
      description: "Focus on what the interviewer is saying and ask clarifying questions if needed."
    },
    {
      title: "Follow Up",
      description: "Send a thank-you email within 24 hours expressing your appreciation and continued interest."
    }
  ];

  const resources = [
    {
      title: "Resume Review",
      description: "Ensure your resume is up-to-date and tailored to the position you're interviewing for.",
      link: "/resume"
    },
    {
      title: "Industry Guides",
      description: "Access our collection of industry-specific interview preparation guides.",
      link: "/interview/industries"
    },
    {
      title: "Mock Interview",
      description: "Practice with our AI interviewer to get real-time feedback on your responses.",
      link: "/interview/mock"
    },
    {
      title: "Video Tutorials",
      description: "Watch expert tips and techniques for mastering different interview formats.",
      link: "/interview/videos"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header isAuthenticated={true} />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-2">
            Interview <span className="text-jobblue">Tips & Resources</span>
          </h1>
          <p className="text-gray-600 mb-10">Expert advice to help you ace your next job interview</p>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-semibold mb-6">Essential Interview Tips</h2>
              <div className="space-y-6">
                {tips.map((tip, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-jobblue text-white flex items-center justify-center font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{tip.title}</h3>
                      <p className="text-gray-600">{tip.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-6">Helpful Resources</h2>
              <div className="grid gap-6">
                {resources.map((resource, index) => (
                  <a 
                    key={index} 
                    href={resource.link} 
                    className="block p-5 border rounded-lg hover:shadow-md transition-shadow bg-white"
                  >
                    <h3 className="font-semibold text-jobblue">{resource.title}</h3>
                    <p className="text-gray-600">{resource.description}</p>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 border rounded-lg p-8 mb-12">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/3">
                <img 
                  src="/lovable-uploads/c4738e71-085a-49a6-aabc-c96796f5844b.png" 
                  alt="Interview Coaching" 
                  className="rounded-lg"
                />
              </div>
              <div className="md:w-2/3">
                <h2 className="text-2xl font-semibold mb-4">Need Personalized Help?</h2>
                <p className="text-gray-600 mb-6">
                  Our career coaches provide one-on-one interview coaching tailored to your specific needs and industry.
                  Whether you're a recent graduate or a seasoned professional, we can help you prepare for your next
                  big opportunity.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Personalized interview strategy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Mock interviews with detailed feedback</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Industry-specific question preparation</span>
                  </div>
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

export default InterviewTipsPage;
