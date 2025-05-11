
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Check } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ResumeUploader from "@/components/resume/ResumeUploader";
import ResumeRecommendations from "@/components/resume/ResumeRecommendations";

const ResumePage = () => {
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [resumeFileName, setResumeFileName] = useState("");
  const [open, setOpen] = useState(false);

  const handleUpload = (fileName) => {
    setResumeFileName(fileName);
    setUploadSuccess(true);
    setOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header isAuthenticated={true} />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">
              Resume <span className="text-jobblue">Analyzer</span>
            </h1>
            <p className="text-gray-600 mb-8">
              Upload your resume to get personalized feedback and recommendations to improve your chances of landing your dream job.
            </p>

            {!uploadSuccess ? (
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Upload Your Resume</h2>
                <ResumeUploader onUpload={handleUpload} />
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <Check className="h-6 w-6 text-green-600" />
                  </div>
                  <h2 className="text-xl font-semibold">Resume Successfully Uploaded</h2>
                </div>
                <p className="text-gray-600 mb-4">
                  {resumeFileName} has been uploaded and analyzed.
                </p>
                <Button 
                  className="bg-jobblue hover:bg-jobblue-dark"
                  onClick={() => setUploadSuccess(false)}
                >
                  Upload Another Resume
                </Button>
              </div>
            )}

            {uploadSuccess && <ResumeRecommendations />}
          </div>
        </div>
      </main>
      <Footer />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Resume Uploaded Successfully</DialogTitle>
            <DialogDescription>
              Your resume has been uploaded and analyzed. Here are some recommendations to improve it.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="flex items-center gap-2">
              <div className="bg-green-100 p-1 rounded-full">
                <Check className="h-4 w-4 text-green-600" />
              </div>
              <p className="text-sm">Strong summary section</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-green-100 p-1 rounded-full">
                <Check className="h-4 w-4 text-green-600" />
              </div>
              <p className="text-sm">Good experience descriptions</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-yellow-100 p-1 rounded-full">
                <Check className="h-4 w-4 text-yellow-600" />
              </div>
              <p className="text-sm">Consider adding more keywords related to your target job</p>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" onClick={() => setOpen(false)}>
              View Detailed Analysis
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ResumePage;
