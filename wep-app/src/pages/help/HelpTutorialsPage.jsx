
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const HelpTutorialsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const allTutorials = [
    {
      id: 1,
      title: "How to Create Your First Job Posting",
      description: "Learn how to create an effective job posting that attracts the right candidates",
      category: "employers",
      duration: "5 min",
      thumbnailUrl: "/lovable-uploads/1bd9608b-ef25-46ed-923f-67f6de7dc36c.png"
    },
    {
      id: 2,
      title: "Resume Analyzer Tutorial",
      description: "Get the most out of our AI-powered resume analyzer tool",
      category: "jobseekers",
      duration: "3 min",
      thumbnailUrl: "/lovable-uploads/7566b5e3-9ff2-44eb-8c27-5cbf3103ecc6.png"
    },
    {
      id: 3,
      title: "Interview Preparation Guide",
      description: "Prepare for your interviews with our comprehensive guide",
      category: "jobseekers",
      duration: "7 min",
      thumbnailUrl: "/lovable-uploads/fa2a8727-4998-459c-a896-dcd1da4f0b9a.png"
    },
    {
      id: 4,
      title: "How to Filter Job Applications",
      description: "Learn how to efficiently filter and manage job applications",
      category: "employers",
      duration: "4 min",
      thumbnailUrl: "/lovable-uploads/1bd9608b-ef25-46ed-923f-67f6de7dc36c.png"
    },
    {
      id: 5,
      title: "Setting up Your Profile",
      description: "Maximize your visibility with a complete profile",
      category: "both",
      duration: "2 min",
      thumbnailUrl: "/lovable-uploads/765c0a81-b40b-48c7-a075-956aad70d353.png"
    },
    {
      id: 6,
      title: "Managing Your Account",
      description: "Learn how to update your account settings and preferences",
      category: "both",
      duration: "3 min",
      thumbnailUrl: "/lovable-uploads/765c0a81-b40b-48c7-a075-956aad70d353.png"
    }
  ];

  const filteredTutorials = allTutorials.filter(tutorial => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tutorial.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || tutorial.category === activeCategory || 
                           (activeCategory === "both" && tutorial.category === "both");
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="bg-jobblue-light py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
              Video <span className="text-jobblue">Tutorials</span>
            </h1>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
              Browse our collection of video tutorials to learn how to use JobGenius effectively and maximize your job search or hiring process.
            </p>
            
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                placeholder="Search tutorials..." 
                className="pl-10" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="container mx-auto py-12 px-4">
          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveCategory}>
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="all">All Tutorials</TabsTrigger>
                <TabsTrigger value="jobseekers">For Job Seekers</TabsTrigger>
                <TabsTrigger value="employers">For Employers</TabsTrigger>
                <TabsTrigger value="both">General</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-0">
              <TutorialGrid tutorials={filteredTutorials} />
            </TabsContent>
            
            <TabsContent value="jobseekers" className="mt-0">
              <TutorialGrid tutorials={filteredTutorials} />
            </TabsContent>
            
            <TabsContent value="employers" className="mt-0">
              <TutorialGrid tutorials={filteredTutorials} />
            </TabsContent>
            
            <TabsContent value="both" className="mt-0">
              <TutorialGrid tutorials={filteredTutorials} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

/**
 * Grid component for displaying tutorial cards
 * @param {Object} props
 * @param {Array} props.tutorials - Array of tutorial objects
 */
const TutorialGrid = ({ tutorials }) => {
  if (tutorials.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No tutorials found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tutorials.map(tutorial => (
        <TutorialCard 
          key={tutorial.id}
          title={tutorial.title}
          description={tutorial.description}
          duration={tutorial.duration}
          thumbnailUrl={tutorial.thumbnailUrl}
        />
      ))}
    </div>
  );
};

/**
 * Card component for displaying a tutorial
 * @param {Object} props
 * @param {string} props.title - Tutorial title
 * @param {string} props.description - Tutorial description
 * @param {string} props.duration - Tutorial duration
 * @param {string} props.thumbnailUrl - URL of the tutorial thumbnail
 */
const TutorialCard = ({ title, description, duration, thumbnailUrl }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video relative overflow-hidden bg-gray-100">
        <img 
          src={thumbnailUrl} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 text-xs rounded">
          {duration}
        </div>
      </div>
      <CardContent className="pt-4">
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <Button className="w-full bg-jobblue hover:bg-jobblue-dark">
          Watch Tutorial
        </Button>
      </CardContent>
    </Card>
  );
};

export default HelpTutorialsPage;
