
import { useState , useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import JobDetailHeader from "@/components/jobs/JobDetailHeader";
import JobDescription from "@/components/jobs/JobDescription";
import JobBenefits from "@/components/jobs/JobBenefits";
import SimilarJobs from "@/components/jobs/SimilarJobs";
import JobApplicationForm from "@/components/jobs/JobApplicationForm";
import SuccessModal from "@/components/jobs/SuccessModal";
import { Dialog } from "@/components/ui/dialog";
import { useJobStore } from "@/reducers/JobListingReducerStore";
import { format } from "date-fns";
import { parse } from "path";
import { DialogContent } from "@radix-ui/react-dialog";

const JobDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { getJobById ,fetchJobs } = useJobStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const[jobData, setJobData] = useState<any>({});
   // getJobById(3);
   useEffect(() => {
    const fetchJobData = async () => {
      setLoading(true);
      setError(null);

      try {
        const jobId = id ? parseInt(id, 10) : 1; 
        if (isNaN(jobId)) {
          throw new Error("Invalid job ID");
        }
        const data = await getJobById(jobId);
        setJobData(data);
        console.log("JobDetails: Fetched jobData:", data);
      } catch (err) {
        const errorMessage = err.message || "Failed to load job data";
        setError(errorMessage);
        console.error("JobDetails: Error:", errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchJobData();
    
  }, [id]); // Re-run if id changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!jobData) {
    return <div>No job data found</div>;
  }
  // const job = getJobById(id ? parseInt(id) : 1);
  // In a real app, you would fetch job details based on the id
  const job = {
    id: id || "1",
    title: "Social Media Assistant",
    company: "Nomad",
    location: "Paris, France",
    type: "Full-Time",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent mauris tortor, egestas hendrerit tempus sit, fringilla at metus dui. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris rutilus a urna vitae mollis. See the article(https://www.example.com/#some-article-link).",
    responsibilities: [
      "Community engagement to ensure that is supported and actively represented online",
      "Focus on social media content development and publication",
      "Marketing and strategy support",
      "Stay on top of trends on social media platforms, and suggest content ideas to the team",
      "Engage with online communities"
    ],
    requirements: [
      "You get energy from people and building the ideal work environment",
      "You have a sense for beautiful scenes and office experiences",
      "You are a confident office manager, ready for added responsibilities",
      "You're detail-oriented and creative",
      "You're a growth marketer and know how to run campaigns"
    ],
    niceTohaves: [
      "Fluent in English",
      "Project management skills",
      "Copy writing skills"
    ],
    datePosted: "July 1, 2021",
    salary: "€714 - $858 USD",
    skills: ["Marketing", "Design"]
  };

  const handleApplyClick = () => {
    setIsApplicationOpen(true);
  };

  const handleApplicationSubmit = () => {
    setIsApplicationOpen(false);
    setIsSuccessOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <JobDetailHeader 
          Jobid={parseInt(jobData.jobID)}
          title={jobData.title}
          company={jobData.company}
          location={`${jobData.city}, ${jobData.country}`}
          type={jobData.type}
          onApply={handleApplyClick}
        />
        
        <JobDescription 
          description={jobData.description}
          responsibilities={job.responsibilities}
          requirements={job.requirements} // jobData.whoyouare isn't an array  so do nice to have and responsibilites
          niceTohaves={job.niceTohaves}
          datePosted={format(new Date(jobData.jobPostedOn), "MMMM d, yyyy")}
          salary={` from ${jobData.salaryFrom} to ${jobData.salaryTo}`}
          jobType={jobData.type}
          catigories={jobData.categories.$values}
          skills={jobData.skills.$values}
          appliedCount={jobData.applicationSent}
          capacity={jobData.capacity}
        />
        
        <JobBenefits   />
        
        <SimilarJobs />

        <Dialog open={isApplicationOpen} onOpenChange={setIsApplicationOpen}>
          <div className=" max-h-[90vh] overflow-y-auto">
            <JobApplicationForm 
              jobTitle={job.title}
              companyName={job.company}
              location={job.location}
              type={job.type}
              onSubmit={handleApplicationSubmit}
            />
          </div>
        </Dialog>

        <Dialog open={isSuccessOpen} onOpenChange={setIsSuccessOpen}>
          <SuccessModal 
            title="Success! Your job application sent"
            subtitle="Good luck!"
            onClose={() => setIsSuccessOpen(false)}
          />
        </Dialog>
      </main>
      <Footer />
    </div>
  );
};

export default JobDetailPage;
