
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

/**
 * Job application form component
 * @param {Object} props
 * @param {string} props.jobTitle - Title of the job
 * @param {string} props.companyName - Name of the company
 * @param {string} props.location - Job location
 * @param {string} props.type - Job type
 * @param {Function} props.onSubmit - Submit handler function
 */
const JobApplicationForm = ({ jobTitle, companyName, location, type, onSubmit }) => {
  const { toast } = useToast();
  const [resumeFile, setResumeFile] = useState(null);
  const [coverLetterFile, setCoverLetterFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    coverLetter: "",
  });
  
  const [isUploading, setIsUploading] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleResumeChange = (e) => {
    if (e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };
  
  const handleCoverLetterFileChange = (e) => {
    if (e.target.files[0]) {
      setCoverLetterFile(e.target.files[0]);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!resumeFile) {
      toast({
        title: "Resume Required",
        description: "Please upload your resume to apply.",
        variant: "destructive"
      });
      return;
    }
    
    setIsUploading(true);
    
    // Simulate upload
    setTimeout(() => {
      setIsUploading(false);
      onSubmit();
    }, 1500);
  };
  
  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader className="flex flex-col gap-0">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-emerald-500 rounded-lg flex items-center justify-center text-white text-xl font-bold">
            N
          </div>
          <DialogTitle>Apply for {jobTitle}</DialogTitle>
        </div>
        <div className="flex items-center gap-2 p-2 pt-0 text-sm mb-6">
          <span className="font-medium">{companyName}</span>
          <span className="text-gray-500">·</span>
          <span>{location}</span>
          <span className="text-gray-500">·</span>
          <span>{type}</span>
        </div>
      </DialogHeader>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
          <Input
            id="name"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number</label>
          <Input
            id="phone"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label htmlFor="resume" className="block text-sm font-medium mb-1">Resume</label>
          <div className="flex items-center gap-4">
            <Input
              id="resume"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeChange}
              required
            />
            {resumeFile && (
              <div className="bg-green-50 p-1 rounded-full">
                <Check size={16} className="text-green-600" />
              </div>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-1">Accepted formats: PDF, DOC, DOCX</p>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="coverLetter" className="block text-sm font-medium">Cover Letter</label>
            <span className="text-xs text-gray-500">Optional</span>
          </div>
          <Textarea
            id="coverLetter"
            name="coverLetter"
            placeholder="Tell us why you're a good fit for this position"
            value={formData.coverLetter}
            onChange={handleChange}
            rows={4}
          />
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="coverLetterFile" className="block text-sm font-medium">Upload Cover Letter</label>
            <span className="text-xs text-gray-500">Optional</span>
          </div>
          <div className="flex items-center gap-4">
            <Input
              id="coverLetterFile"
              type="file"
              required={true}
              placeholder="Upload your cover letter"
              accept=".pdf,.doc,.docx"
              onChange={handleCoverLetterFileChange}
              className="w-40 border-2 border-dashed border-jobblue rounded-sm shadow-sm focus:ring focus:ring-blue-500"
            />
            
            {coverLetterFile && (
              <div className="bg-green-50 p-1 rounded-full">
                <Check size={16} className="text-green-600" />
              </div>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-1">Accepted formats: PDF, DOC, DOCX</p>
        </div>
        
        <Button 
          type="submit" 
          className="bg-jobblue hover:bg-jobblue-dark w-full"
          disabled={isUploading}
        >
          {isUploading ? "Submitting Application..." : "Submit Application"}
        </Button>
      </form>
    </DialogContent>
  );
};

export default JobApplicationForm;
