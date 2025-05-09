
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import LogoIcon from "../common/LogoIcon";

const DeleteAccountModal = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4">
            <LogoIcon className="h-10 w-10" />
            <span className="ml-2 text-xl font-semibold">JobGenius</span>
          </div>
          <DialogTitle className="text-2xl">Are you sure you want to delete your account?</DialogTitle>
          <DialogDescription className="text-base">
            This action is permanent and cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
          <Button 
            variant="outline" 
            className="flex-1 border-jobblue text-jobblue hover:bg-jobblue/10" 
            onClick={() => onOpenChange(false)}
          >
            No, Cancel
          </Button>
          <Button 
            className="flex-1 bg-red-600 hover:bg-red-700" 
            onClick={() => onOpenChange(false)}
          >
            Yes, Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAccountModal;
