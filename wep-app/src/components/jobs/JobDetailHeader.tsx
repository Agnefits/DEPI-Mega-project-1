
import { Share, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {useJobStore} from '@/reducers/JobListingReducerStore';
interface JobDetailHeaderProps {
  Jobid: number
  title: string;
  company: string;
  location: string;
  type: string;
  onApply: () => void;
}


const JobDetailHeader = ({ Jobid ,title, company, location, type, onApply }: JobDetailHeaderProps) => {
const {saveJobByID} = useJobStore();
  const handleSaveJob = () => {
    saveJobByID(Jobid);

    console.log("button clicked");
  }
  return (
    <header className="py-4 border-b">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 bg-emerald-500 rounded-lg flex items-center justify-center text-white text-xl font-bold">
              N
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
              <div className="flex items-center mt-1">
                <span className="text-gray-600">{company} • {location} • {type}</span>
              </div>
            </div>
          </div>
          <div className="flex mt-4 md:mt-0 space-x-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Share size={16} /> Share
            </Button>
            <Button variant="outline" size="sm" className="gap-2" onClick={handleSaveJob} >
              <Bookmark size={16} /> Save
            </Button>
            <Button size="sm" onClick={onApply}>Apply</Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default JobDetailHeader;
