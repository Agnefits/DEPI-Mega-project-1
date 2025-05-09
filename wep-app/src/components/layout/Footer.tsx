
import { Link } from "react-router-dom";
import LogoIcon from "../common/LogoIcon";
import { Facebook, Linkedin, Twitter, Instagram, Youtube, X, Dribbble, LucideTwitter } from "lucide-react";
import NewsletterSection from "./NewsletterSection";

const Footer = () => {
  return (
    <footer className="footer-background text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-evenly mb-8">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center mb-4">
              <LogoIcon className="h-8 w-8" />
              <span className="ml-2 text-xl font-semibold">JobGenius</span>
            </Link>
            <p className="text-sm max-w-xs text-gray-300">
              A smart platform that connects job seekers with leading employers and top career
              opportunities, featuring AI-powered resume analysis and interview preparation tools.
            </p>
          </div>

          <div className="flex flex-col items-center space-x-4 gap-5">
            <NewsletterSection />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <h3 className="text-sm font-bold mb-4">Jobs</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li><Link to="/jobs" className="hover:text-jobblue-light">Find Jobs</Link></li>
                  {/* <li><Link to="/jobs/trending" className="hover:text-jobblue-light">Trending</Link></li>
                  <li><Link to="/jobs/terms" className="hover:text-jobblue-light">Terms</Link></li>
                  <li><Link to="/jobs/advice" className="hover:text-jobblue-light">Advice</Link></li>
                  <li><Link to="/privacy" className="hover:text-jobblue-light">Privacy Policy</Link></li> */}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-bold mb-4">Resume Analyzer</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li><Link to="/resume" className="hover:text-jobblue-light">How it works</Link></li>
                  <li><Link to="/resume/upload" className="hover:text-jobblue-light">Upload Resume</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-bold mb-4">Interview Preparation</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li><Link to="/interview" className="hover:text-jobblue-light">Practice Questions Library</Link></li>
                  {/* <li><Link to="/interview/tips" className="hover:text-jobblue-light">Tips & Resources</Link></li> */}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-bold mb-4">Help & Support</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li><Link to="/help/faqs" className="hover:text-jobblue-light">FAQs</Link></li>
                  {/* <li><Link to="/help/tutorials" className="hover:text-jobblue-light">Tutorials</Link></li> */}
                  <li><Link to="/help/contact" className="hover:text-jobblue-light">Contact Support form</Link></li>
                  <li><Link to="/terms" className="hover:text-jobblue-light">Terms & Conditions</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-gray-400">© 2025 © JobGenius. All rights reserved.</p>

          <div className="flex space-x-4 mt-4 md:mt-0">
            <a target="blank" href="https://www.facebook.com" className="text-gray-400 hover:text-white">
              <Facebook size={20} />
            </a>
            <a target="blank" href="https://www.instagram.com/" className="text-gray-400 hover:text-white">
              <Instagram size={20} />
            </a>
            <a target="blank" href="https://dribbble.com/" className="text-gray-400 hover:text-white">
              <Dribbble size={20} />
            </a>
            <a target="blank" href="https://www.linkedin.com/" className="text-gray-400 hover:text-white">
              <Linkedin size={20} />
            </a>
            <a target="blank" href="https://x.com/" className="text-gray-400 hover:text-white">
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
