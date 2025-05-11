
import { Bookmark } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import JobApplicationForm from "./JobApplicationForm";
import { useJobStore } from "@/reducers/JobListingReducerStore";
import { useState } from "react";

interface JobCardProps {
  id: number;
  logo: React.ReactNode;
  title: string;
  company: string;
  city: string;
  country: string;
  type: string;
  categories: string[];
  applicationSent?: number;
  capacity?: number;
}

const JobCard = ({
  id,
  // logo,
  title,
  company,
  // location,
  city,
  country,
  type,
  categories,
  applicationSent,
  capacity,
}: JobCardProps) => {
  const {saveJobByID , deleteSavedJob } = useJobStore();
  const [isJobSaved, setIsJobSaved] = useState(false);
  const handleSaveJob = (id: number) => {
    if(!isJobSaved){  
      saveJobByID(id);
      setIsJobSaved(!isJobSaved);
    }
    else{
      deleteSavedJob(id);
      setIsJobSaved(!isJobSaved);
    }
    
  }
  return (
    <div className="border-b py-4 flex flex-col sm:flex-row justify-between items-start gap-4">
      <div className="flex gap-4">
        <Link to={`/jobs/${id}`}>
          <div className="w-12 h-12 flex items-center justify-center rounded-md overflow-hidden">
            <div className="w-full h-full bg-emerald-500 flex items-center justify-center text-white">
                 {title.split(' ').length>1?title.split(' ')[0].charAt(0).toUpperCase()+title.split(' ')[1].charAt(0).toUpperCase():title.charAt(0).toUpperCase()}
            </div>
          
          </div>
        </Link>
        <div className="space-y-1">
          <Link to={`/jobs/${id}`}>
            <h3 className="font-medium text-lg">{title}</h3>
          </Link>
          <p className="text-gray-500 text-sm">
            {company} • {city}, {country}
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="bg-green-100 text-green-600 text-xs rounded-full px-2 py-1">
              {type}
            </span>
            {categories.map((category, index) => (
              <Badge
                key={index}
                variant="outline"
                className={`${
                  category === "Marketing"
                    ? "bg-orange-100 text-orange-600 hover:bg-orange-100"
                    : category === "Design"
                    ? "bg-purple-100 text-purple-600 hover:bg-purple-100"
                    : "bg-blue-100 text-blue-600 hover:bg-blue-100"
                } border-none text-xs`}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-2 w-full sm:w-auto">
        <Button variant="outline" size="sm" className={ `rounded-md px-3` } onClick={() => handleSaveJob(id)}>
          <Bookmark className="h-4 w-4" />
        </Button>
        <Link to={`/jobs/${id}`} className="w-full sm:w-auto">
          <Button size="sm" className="rounded-md w-full">Apply</Button>
        </Link>
      </div>
      {applicationSent !== undefined && capacity !== undefined && (
        <div className="text-xs text-gray-500 mt-1 sm:mt-0 sm:ml-auto">
          {applicationSent} applied of {capacity} capacity
        </div>
      )}
    </div>
  );
};

export default JobCard;
