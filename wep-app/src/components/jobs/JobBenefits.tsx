
import { Heart, Umbrella, Monitor, Users, MapPin, Bus, HandHelping } from 'lucide-react';

interface BenefitProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Benefit = ({ icon, title, description }: BenefitProps) => (
  <div className="flex flex-col items-start">
    <div className="text-jobblue mb-3">{icon}</div>
    <h3 className="font-semibold mb-2">{title}</h3>
    <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
  </div>
);

const JobBenefits = () => {
  const benefits = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Full Healthcare",
      description: "We believe in thriving communities and that starts with our team being happy and healthy."
    },
    {
      icon: <Umbrella className="h-8 w-8" />,
      title: "Unlimited Vacation",
      description: "We believe you should have a flexible schedule that makes space for family, wellness, and fun."
    },
    {
      icon: <Monitor className="h-8 w-8" />,
      title: "Skill Development",
      description: "We believe in always learning and leveling up our skills. Whether it's a conference or online course."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Team Summits",
      description: "Every 6 months we have a full team summit where we have fun, reflect, and plan for the upcoming quarter."
    },
    {
      icon: <MapPin className="h-8 w-8" />,
      title: "Remote Working",
      description: "This shows how you perform your best. Work from home, coffee shop or anywhere when you feel like it."
    },
    {
      icon: <Bus className="h-8 w-8" />,
      title: "Commuter Benefits",
      description: "We're grateful for all the time and energy each team member puts into getting to work every day."
    },
    {
      icon: <HandHelping className="h-8 w-8" />,
      title: "We give back.",
      description: "We anonymously match any donation our employees make. Up to $5,000. For a nonprofit that you support! The organization they choose doesn't matter—even Yeet Save lives."
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-gray-800">Perks & Benefits</h2>
        <p className="text-gray-600 mb-8">This job comes with several perks and benefits</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.slice(0, 4).map((benefit, index) => (
            <Benefit key={index} {...benefit} />
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {benefits.slice(4).map((benefit, index) => (
            <Benefit key={index + 4} {...benefit} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobBenefits;
