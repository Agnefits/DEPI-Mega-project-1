
import { Link } from "react-router-dom";
import { ArrowRight, Palette, BarChart, MessagesSquare, Wallet, Monitor, Code, Briefcase, Users } from "lucide-react";
import { useJobStore } from "@/reducers/JobListingReducerStore";
import { useEffect , useState} from "react";
interface CategoryCardProps {
  // icon: React.ReactNode;
  title: string;
  jobCount: number;
  path: string;
}
const CategoryCard = ({ title, jobCount, path }: CategoryCardProps) => {
  return (
    <Link 
      to={path}
      className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col items-center justify-center"
    >
      <div className="text-jobblue mb-3"><Briefcase size={28} /></div>
      <h3 className="text-gray-800 font-medium text-lg mb-1">{title}</h3>
      <p className="text-gray-500 text-sm mb-3">{jobCount} jobs available</p>
      <div className="text-jobblue flex items-center text-sm">
        <ArrowRight size={16} className="ml-1" />
      </div>
    </Link>
  );
};

const CategorySection = () => {
const { fetchCategoriesWithCount, categoriesWithCount } = useJobStore();

    const [slicedCategories, setSlicedCategories] = useState([]);
  useEffect(() => {
    fetchCategoriesWithCount();
  } ,[]);
useEffect(() => {
  if (categoriesWithCount.length >= 8) {
    const shuffled = [...categoriesWithCount].sort(() => 0.5 - Math.random());
    const sliced = shuffled.slice(0, 8);
    setSlicedCategories(sliced);
  }
}, [categoriesWithCount]);
  // const categories = [
  //   {
  //     icon: <Palette size={28} />,
  //     title: "Design",
  //     jobCount: 235,
  //     path: "/jobs/category/design"
  //   },
  //   {
  //     icon: <BarChart size={28} />,
  //     title: "Sales",
  //     jobCount: 756,
  //     path: "/jobs/category/sales"
  //   },
  //   {
  //     icon: <MessagesSquare size={28} />,
  //     title: "Marketing",
  //     jobCount: 140,
  //     path: "/jobs/category/marketing"
  //   },
  //   {
  //     icon: <Wallet size={28} />,
  //     title: "Finance",
  //     jobCount: 325,
  //     path: "/jobs/category/finance"
  //   },
  //   {
  //     icon: <Monitor size={28} />,
  //     title: "Technology",
  //     jobCount: 436,
  //     path: "/jobs/category/technology"
  //   },
  //   {
  //     icon: <Code size={28} />,
  //     title: "Engineering",
  //     jobCount: 542,
  //     path: "/jobs/category/engineering"
  //   },
  //   {
  //     icon: <Briefcase size={28} />,
  //     title: "Business",
  //     jobCount: 211,
  //     path: "/jobs/category/business"
  //   },
  //   {
  //     icon: <Users size={28} />,
  //     title: "Human Resource",
  //     jobCount: 346,
  //     path: "/jobs/category/human-resource"
  //   }
  // ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Explore by <span className="text-jobblue">categories</span>
          </h2>
          <Link to="/jobs" className="text-jobblue flex items-center text-sm hover:underline">
            Show all jobs <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {slicedCategories?.map((category, index) => (
            <CategoryCard key={index}  title= {category.categoryName} jobCount={category.jobCount} path={`/jobs/category/${category.categoryName}`} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
