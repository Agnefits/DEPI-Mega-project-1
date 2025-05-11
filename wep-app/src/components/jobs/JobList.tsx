
import { useState  , useEffect } from 'react';
import { Button } from '@/components/ui/button';
import JobCard from './JobCard';
import { Grid, List, ArrowLeft, ArrowRight, Search } from 'lucide-react';
import {useJobStore} from '@/reducers/JobListingReducerStore';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useParams } from 'react-router-dom';

// const companyLogos = {
//   nomad: <div className="w-full h-full bg-emerald-500 flex items-center justify-center text-white">N</div>,
//   dropbox: <div className="w-full h-full bg-blue-500 flex items-center justify-center text-white">DB</div>,
//   terraform: <div className="w-full h-full bg-cyan-500 flex items-center justify-center text-white">TF</div>,
//   recruit: <div className="w-full h-full bg-gray-500 flex items-center justify-center text-white">RC</div>,
//   canva: <div className="w-full h-full bg-teal-500 flex items-center justify-center text-white">CA</div>,
//   classpass: <div className="w-full h-full bg-blue-600 flex items-center justify-center text-white">CP</div>,
//   pitch: <div className="w-full h-full bg-black flex items-center justify-center text-white">PI</div>,
//   stripe: <div className="w-full h-full bg-purple-500 flex items-center justify-center text-white">S</div>,
//   truebill: <div className="w-full h-full bg-blue-500 flex items-center justify-center text-white">TB</div>,
//   square: <div className="w-full h-full bg-black flex items-center justify-center text-white">SQ</div>,
//   coinbase: <div className="w-full h-full bg-blue-500 flex items-center justify-center text-white">CB</div>,
//   robinhood: <div className="w-full h-full bg-gray-200 flex items-center justify-center text-black">RH</div>,
//   kraken: <div className="w-full h-full bg-purple-600 flex items-center justify-center text-white">KR</div>,
// };

// const {categoryName} = useParams();


interface JobListProps {
  type?: 'all' | 'ai' | 'finance';
  title?: string;
  showFilter?: boolean;
}

const JobList = ({ type = 'all', title = 'All Jobs', showFilter = true }: JobListProps) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [currentPage, setCurrentPage] = useState(1);
  const {  fetchJobs , jobs} = useJobStore();
  const [start, setStart] = useState(0);
  const [slicedJobs, setSlicedJobs] = useState<any>([]); 

useEffect(() => {
  fetchJobs();
}, []);

useEffect(() => {
  const end = start + 10;
  if (Array.isArray(jobs)) {
    const sliced = jobs.slice(start, end);
    setSlicedJobs(sliced);
  } else if (jobs?.$values && Array.isArray(jobs.$values)) {
    const sliced = jobs.$values.slice(start, end).sort(() => 0.5 - Math.random());
    setSlicedJobs(sliced);
  } else {
    console.warn("Jobs data is not valid array:", jobs);
    setSlicedJobs([]);
  }
}, [jobs, start]);

// useEffect(() => {
//   if (categoryName) {
//    const filteredJobs = jobs.filter((job: any) => 
//   job.categories.$values.includes(categoryName)
// );

//     setSlicedJobs(filteredJobs);
//   }
// } , [categoryName]);

useEffect(() => {
  console.log("Sliced jobs:", slicedJobs);
}, [slicedJobs]);

const jobsForward10 = () => {
  const totalLength = Array.isArray(jobs) ? jobs.length : jobs?.$values?.length || 0;

  if (start + 10 < totalLength) {
    setStart(prev => prev + 10);
    setCurrentPage(prev => prev + 1);
  }
};

const jobsBack10 = () => {
  if (start - 10 >= 0) {
    setStart(prev => prev - 10);
    setCurrentPage(prev => prev - 1);
  }
};



  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            {title}
            {type !== 'ai' && (
              <span className="text-sm font-normal text-gray-500 ml-2">
                Showing {slicedJobs.length} results
              </span>
            )}
          </h2>
          
          {showFilter && (
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-500">Sort by:</span>
              <Select defaultValue="mostRelevant">
                <SelectTrigger className="w-40 h-9 text-sm">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mostRelevant">Most relevant</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="highestPaid">Highest paid</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="hidden sm:flex items-center border rounded-md">
                <Button 
                  variant={viewMode === 'grid' ? 'default' : 'ghost'} 
                  size="sm"
                  className={`rounded-none ${viewMode === 'grid' ? '' : 'text-gray-500'}`}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid size={18} />
                </Button>
                <Button 
                  variant={viewMode === 'list' ? 'default' : 'ghost'} 
                  size="sm" 
                  className={`rounded-none ${viewMode === 'list' ? '' : 'text-gray-500'}`}
                  onClick={() => setViewMode('list')}
                >
                  <List size={18} />
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-1'}`}>
          {
          slicedJobs.map((job) => (
            <JobCard key={job.jobID}  {...job} id={job.jobID} categories={job.categories.$values}/>
          ))}
          
          {/* {slicedJobs.map((job) => (
            <JobCard key={job.jobID} {...job} />
          ))} */}
        </div>

        {type === 'all' && (
          <div className="flex justify-center mt-10">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" onClick={jobsBack10} disabled={currentPage === 1}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Button variant={currentPage === 1 ? "default" : "outline"} size="sm" className="w-8 h-8 p-0">1</Button>
              <Button variant={currentPage === 2 ? "default" : "outline"} size="sm" className="w-8 h-8 p-0">2</Button>
              <Button variant={currentPage === 3 ? "default" : "outline"} size="sm" className="w-8 h-8 p-0">3</Button>
              <Button variant={currentPage === 4 ? "default" : "outline"} size="sm" className="w-8 h-8 p-0">4</Button>
              <Button variant={currentPage === 5 ? "default" : "outline"} size="sm" className="w-8 h-8 p-0">5</Button>
              <span className="px-2">...</span>
              <Button variant="outline" size="sm" className="w-8 h-8 p-0">33</Button>
              <Button variant="outline" size="icon" onClick={jobsForward10} disabled={start + 10 >= jobs.length}>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default JobList;
