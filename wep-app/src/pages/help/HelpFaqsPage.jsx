
import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const HelpFaqsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const faqs = [
    {
      category: "Account",
      questions: [
        {
          question: "How do I create an account?",
          answer: "To create an account, click on the 'Sign Up' button in the top right corner of the homepage. Fill out the required information and follow the instructions to complete your registration."
        },
        {
          question: "How do I reset my password?",
          answer: "If you forgot your password, click on the 'Login' button, then select 'Forgot Password'. Enter your email address and we'll send you instructions to reset your password."
        },
        {
          question: "Can I delete my account?",
          answer: "Yes, you can delete your account by going to your Account Settings and selecting 'Delete Account'. Please note that this action is irreversible and all your data will be permanently removed."
        }
      ]
    },
    {
      category: "Job Search",
      questions: [
        {
          question: "How do I search for jobs?",
          answer: "You can search for jobs using the search bar on the homepage or the Jobs page. Enter keywords, job titles, or company names and use filters to refine your results."
        },
        {
          question: "How do I set up job alerts?",
          answer: "After performing a search, click on the 'Create Alert' button. You'll receive email notifications when new jobs matching your search criteria are posted."
        },
        {
          question: "Why am I not seeing any job results?",
          answer: "This could be due to very specific search criteria. Try broadening your search by using fewer keywords or adjusting your filters such as location range or job type."
        }
      ]
    },
    {
      category: "Resume Tools",
      questions: [
        {
          question: "How does the resume analyzer work?",
          answer: "Our resume analyzer uses AI to evaluate your resume against industry standards and job requirements. It checks for keywords, formatting, and content to provide personalized recommendations."
        },
        {
          question: "What file formats are supported for resume upload?",
          answer: "We support PDF, DOCX, DOC, and TXT file formats for resume uploads. For best results, we recommend using PDF or DOCX formats."
        },
        {
          question: "Is my resume data secure?",
          answer: "Yes, we take data security very seriously. Your resume is encrypted and stored securely. We do not share your resume with employers unless you explicitly apply to jobs through our platform."
        }
      ]
    },
    {
      category: "Interview Preparation",
      questions: [
        {
          question: "How do I access practice interview questions?",
          answer: "Go to the Interview Preparation section of the website and select 'Practice Questions Library'. You can filter questions by industry, job level, and question type."
        },
        {
          question: "Can I get feedback on my interview answers?",
          answer: "Yes, our AI-powered interview coach provides instant feedback on your practice answers. It evaluates your responses based on relevance, clarity, and completeness."
        },
        {
          question: "Are the mock interviews similar to real interviews?",
          answer: "Our mock interviews are designed to simulate real interview experiences. They include questions commonly asked by employers in various industries and roles."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header isAuthenticated={true} />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">
            Frequently Asked <span className="text-jobblue">Questions</span>
          </h1>

          <div className="max-w-xl mx-auto mb-10">
            <Input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="max-w-3xl mx-auto">
            {faqs.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-10">
                <h2 className="text-xl font-semibold mb-4">{category.category}</h2>
                <Accordion type="single" collapsible className="space-y-4">
                  {category.questions.map((faq, faqIndex) => (
                    <AccordionItem 
                      key={faqIndex} 
                      value={`${categoryIndex}-${faqIndex}`}
                      className="border rounded-lg p-2"
                    >
                      <AccordionTrigger className="text-left font-medium px-2">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="px-2 text-gray-600">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 mt-12 text-center">
              <h3 className="text-lg font-semibold mb-2">Still have questions?</h3>
              <p className="text-gray-600 mb-4">
                Contact our support team for personalized assistance
              </p>
              <a href="/help/contact" className="text-jobblue font-medium hover:underline">
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HelpFaqsPage;
