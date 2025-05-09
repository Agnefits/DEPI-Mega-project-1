
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";

interface SimilarJobProps {
  id: string;
  logo: React.ReactNode;
  title: string;
  company: string;
  location: string;
  type: string;
  categories: string[];
}

const SimilarJobCard = ({ id, logo, title, company, location, type, categories }: SimilarJobProps) => {
  return (
    <div className="bg-white rounded-lg p-4 border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-10 h-10 mr-3 rounded overflow-hidden flex items-center justify-center">
            {logo}
          </div>
          <div>
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm text-gray-500">
              {company} • {location}
            </p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
          <Bookmark className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
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

      <div className="flex justify-between">
        <Link to={`/jobs/${id}/details`} className="text-sm text-jobblue hover:underline">
          Show Details
        </Link>
        <Link to={`/jobs/${id}/apply`}>
          <Button size="sm">Apply</Button>
        </Link>
      </div>
    </div>
  );
};

const SimilarJobs = () => {
  const companyLogos = {
    nomad: <div className="w-full h-full bg-emerald-500 flex items-center justify-center text-white">N</div>,
    dropbox: <div className="w-full h-full bg-blue-500 flex items-center justify-center text-white">DB</div>,
    stripe: <div className="w-full h-full bg-purple-500 flex items-center justify-center text-white">S</div>,
    hr: <div className="w-full h-full bg-red-500 flex items-center justify-center text-white">HR</div>,
    brand: <div className="w-full h-full bg-yellow-500 flex items-center justify-center text-white">BD</div>,
    social: <div className="w-full h-full bg-emerald-500 flex items-center justify-center text-white">SM</div>,
  };

  const similarJobs = [
    {
      id: '101',
      logo: companyLogos.social,
      title: 'Social Media Assistant',
      company: 'Stripe',
      location: 'Paris, France',
      type: 'Full-Time',
      categories: ['Marketing', 'Design'],
    },
    {
      id: '102',
      logo: companyLogos.hr,
      title: 'HR Manager',
      company: 'Pocket',
      location: 'Lucern, Switzerland',
      type: 'Full-Time',
      categories: ['Marketing', 'Design'],
    },
    {
      id: '103',
      logo: companyLogos.brand,
      title: 'Brand Designer',
      company: 'Dropbox',
      location: 'San Francisco, USA',
      type: 'Full-Time',
      categories: ['Marketing', 'Design'],
    },
    {
      id: '104',
      logo: companyLogos.social,
      title: 'Social Media Assistant',
      company: 'Notify',
      location: 'Paris, France',
      type: 'Full-Time',
      categories: ['Marketing', 'Design'],
    },
    {
      id: '105',
      logo: companyLogos.stripe,
      title: 'Interactive Developer',
      company: 'Terraform',
      location: 'Hamburg, Germany',
      type: 'Full-Time',
      categories: ['Marketing', 'Design'],
    },
    {
      id: '106',
      logo: companyLogos.brand,
      title: 'Brand Designer',
      company: 'Wise',
      location: 'San Francisco, USA',
      type: 'Full-Time',
      categories: ['Marketing', 'Design'],
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Similar Jobs</h2>
          <Link to="/jobs" className="text-jobblue flex items-center text-sm hover:underline">
            Show all jobs <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {similarJobs.slice(0, 6).map((job) => (
            <SimilarJobCard key={job.id} {...job} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SimilarJobs;
