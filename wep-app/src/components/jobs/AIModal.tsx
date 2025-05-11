
import { Button } from "@/components/ui/button";
import { DialogContent } from "@/components/ui/dialog";

interface AIModalProps {
  loading?: boolean;
  onSubmit?: () => void;
  onClose?: () => void;
}

export const AIInfoModal = ({ onSubmit, onClose }: AIModalProps) => {
  return (
    <DialogContent className="max-w-md p-6">
      <div className="mb-6 mt-2">
        <div className="flex justify-center mb-4">
          <div className="h-12 w-12 bg-[#193549] rounded-md flex items-center justify-center text-white font-bold">
            JG
          </div>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 text-center">AI-Powered Job Suggestions by JobGenius</h2>
        
        <p className="mt-4 text-gray-600 text-sm">
          JobGenius AI simplifies your job search by providing intelligent, 
          personalized job recommendations. Using advanced algorithms, it
          analyzes your skills, experience, and preferences to match you with 
          the best opportunities. Say goodbye to endless scrolling; 
          let JobGenius AI bring the right jobs to you effortlessly. Whether 
          you're a fresh graduate or an experienced professional, our smart 
          suggestions help you find your ideal career path faster and with 
          greater accuracy.
        </p>
      </div>
      
      <Button onClick={onSubmit} className="w-full">Get Smart Suggestions</Button>
      
      <p className="text-xs text-gray-500 text-center mt-4">
        By sending the request you can confirm that you accept our <span className="text-jobblue">Terms of Service</span> and <span className="text-jobblue">Privacy Policy</span>.
      </p>
    </DialogContent>
  );
};

export const AILoadingModal = () => {
  return (
    <DialogContent className="max-w-md p-6 text-center">
      <div className="mb-6 mt-8">
        <div className="flex justify-center mb-6">
          <div className="h-12 w-12 bg-[#193549] rounded-md flex items-center justify-center text-white font-bold">
            JG
          </div>
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Analyzing your profile,</h2>
        <p className="text-jobblue mt-1">Finding the best jobs for you!</p>
        
        <div className="flex justify-center mt-6">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-jobblue"></div>
        </div>
      </div>
    </DialogContent>
  );
};

export default { AIInfoModal, AILoadingModal };
