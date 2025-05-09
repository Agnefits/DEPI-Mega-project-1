
import { Button } from "@/components/ui/button";
import { DialogContent } from "@/components/ui/dialog";

interface SuccessModalProps {
  title: string;
  subtitle?: string;
  onClose?: () => void;
}

const SuccessModal = ({ title, subtitle, onClose }: SuccessModalProps) => {
  return (
    <DialogContent className="max-w-md p-6 text-center">
      <div className="mb-6 mt-2">
        <div className="flex justify-center mb-4">
          <div className="h-12 w-12 bg-[#193549] rounded-md flex items-center justify-center text-white font-bold">
            JG
          </div>
        </div>
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        {subtitle && <p className="text-jobblue mt-1">{subtitle}</p>}
      </div>
      <Button onClick={onClose} className="w-full">OK</Button>
    </DialogContent>
  );
};

export default SuccessModal;
