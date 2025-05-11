
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ResumeUploader from "@/components/resume/ResumeUploader";

const ResumeUploadPage = () => {
  const handleUpload = (name: string) => {
    console.log(`File uploaded: ${name}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header isAuthenticated={true} />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">
            Upload Your <span className="text-jobblue">Resume:</span>
          </h1>
          <ResumeUploader onUpload={handleUpload} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ResumeUploadPage;
