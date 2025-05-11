
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import CategorySection from "@/components/home/CategorySection";
import ResumeSection from "@/components/home/ResumeSection";
import InterviewSection from "@/components/home/InterviewSection";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <CategorySection />
        <ResumeSection />
        <InterviewSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
