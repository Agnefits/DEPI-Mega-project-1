
import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const InterviewQuestionsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const questionCategories = [
    {
      name: "Behavioral",
      questions: [
        "Tell me about a time you had to work with a difficult person.",
        "Describe a situation where you had to meet a tight deadline.",
        "Give an example of how you handled a major crisis.",
        "Tell me about a time you went above and beyond for a customer or client.",
        "Describe a time when you had to adapt to a significant change at work."
      ]
    },
    {
      name: "Technical",
      questions: [
        "Explain how you would design a scalable web application.",
        "What testing frameworks have you used and why?",
        "Describe your experience with cloud services.",
        "How do you approach debugging a complex issue?",
        "Explain the concept of OOP in your own words."
      ]
    },
    {
      name: "Leadership",
      questions: [
        "How do you motivate team members?",
        "Describe your leadership style.",
        "Tell me about a time you had to make an unpopular decision.",
        "How do you delegate responsibilities to your team?",
        "How do you handle conflicts within your team?"
      ]
    },
    {
      name: "Problem Solving",
      questions: [
        "Describe a complex problem you solved and your approach.",
        "How do you make decisions when you don't have all the information?",
        "Tell me about a time you failed and what you learned.",
        "How do you prioritize when you have multiple deadlines?",
        "Describe a situation where you had to think outside the box."
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header isAuthenticated={true} />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">
            Practice <span className="text-jobblue">Questions Library</span>
          </h1>

          <div className="mb-8">
            <div className="max-w-md">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
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
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" x2="16.65" y1="21" y2="16.65"></line>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="Behavioral" className="w-full">
            <TabsList className="mb-8">
              {questionCategories.map((category) => (
                <TabsTrigger key={category.name} value={category.name}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {questionCategories.map((category) => (
              <TabsContent key={category.name} value={category.name} className="w-full">
                <div className="grid gap-4">
                  {category.questions.map((question, index) => (
                    <div key={index} className="border rounded-lg p-6 bg-white hover:shadow-md transition-shadow">
                      <h3 className="text-lg font-medium mb-4">{question}</h3>
                      <div className="flex space-x-3">
                        <Button variant="outline" size="sm" className="text-jobblue border-jobblue hover:bg-blue-50">
                          View Sample Answer
                        </Button>
                        <Button size="sm" className="bg-jobblue hover:bg-jobblue-dark text-white">
                          Practice Now
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default InterviewQuestionsPage;
