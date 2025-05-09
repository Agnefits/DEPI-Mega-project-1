
import { CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface JobDescriptionProps {
  description: string;
  responsibilities: string[];
  requirements: string[];
  niceTohaves: string[];
  companyInfo?: string;
  appliedCount?: number;
  capacity?: number;
  datePosted?: string;
  salary?: string;
  jobType?: string;
  skills?: string[];
  applyBefore?: string;
  catigories?: string[];
}

const JobDescription = ({
  description,
  responsibilities,
  requirements,
  niceTohaves,
  companyInfo,
  applyBefore,
  appliedCount,
  capacity,
  datePosted,
  salary,
  jobType,
  skills,
  catigories,
}: JobDescriptionProps) => {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Description</h2>
            <p className="text-gray-600 leading-relaxed">{description}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Responsibilities</h2>
            <ul className="space-y-3">
              {responsibilities.map((item, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Who You Are</h2>
            <ul className="space-y-3">
              {requirements.map((item, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-gray-800">Nice-To-Haves</h2>
            <ul className="space-y-3">
              {niceTohaves.map((item, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">About this role</h3>
            
            {appliedCount !== undefined && capacity !== undefined && (
              <div className="mb-4">
                <p className="text-sm text-gray-500">{appliedCount} applied of {capacity} capacity</p>
              </div>
            )}
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Apply Before</span>
                <span className="font-medium">{applyBefore || "July 1, 2021"}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-500">Job Posted On</span>
                <span className="font-medium">{datePosted || "July 1, 2021"}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-500">Job Type</span>
                <span className="font-medium">{jobType || "Full-Time"}</span>
              </div>
              
              {salary && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Salary</span>
                  <span className="font-medium">{salary}</span>
                </div>
              )}
            </div>

            {skills && skills.length > 0 && (
              <>
                <h4 className="text-lg font-semibold mt-6 mb-3">Categories</h4>
                <div className="flex flex-wrap gap-2">
                  {catigories.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className={`${
                        skill === "Marketing"
                          ? "bg-orange-100 text-orange-600 hover:bg-orange-100"
                          : skill === "Design"
                          ? "bg-purple-100 text-purple-600 hover:bg-purple-100"
                          : "bg-blue-100 text-blue-600 hover:bg-blue-100"
                      } border-none text-xs`}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </>
            )}
            
            <h4 className="text-lg font-semibold mt-6 mb-3">Required Skills</h4>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className={`${
                    skill === "Marketing"
                      ? "bg-orange-100 text-orange-600 hover:bg-orange-100"
                      : skill === "Design"
                      ? "bg-purple-100 text-purple-600 hover:bg-purple-100"
                      : "bg-blue-100 text-blue-600 hover:bg-blue-100"
                  } border-none text-xs`}
                >
                  {skill}
                </Badge>
              ))}

              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
