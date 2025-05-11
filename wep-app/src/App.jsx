import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import NotFound from "./pages/NotFound";
import JobListingPage from "./pages/jobs/JobListingPage";
import JobDetailPage from "./pages/jobs/JobDetailPage";
import JobSearchPage from "./pages/jobs/JobSearchPage";
import JobFinancePage from "./pages/jobs/JobFinancePage";
import ResumeUploadPage from "./pages/resume/ResumeUploadPage";
import ResumePage from "./pages/resume/ResumePage";
import ResumeHowItWorksPage from "./pages/resume/ResumeHowItWorksPage";
import InterviewPage from "./pages/interview/InterviewPage";
import InterviewQuestionsPage from "./pages/interview/InterviewQuestionsPage";
import InterviewTipsPage from "./pages/interview/InterviewTipsPage";
import HelpPage from "./pages/help/HelpPage";
import HelpFaqsPage from "./pages/help/HelpFaqsPage";
import HelpContactPage from "./pages/help/HelpContactPage";
import TermsContent from "./pages/help/TermsContent";
import HelpTutorialsPage from "./pages/help/HelpTutorialsPage";
import SettingsPage from "./pages/settings/SettingsPage";
import ProfilePage from "./pages/settings/ProfilePage";
import AccountPage from "./pages/settings/AccountPage";
import OverviewPage from "./pages/settings/OverviewPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/jobs" element={<JobListingPage />} />
          <Route path="/jobs/:id" element={<JobDetailPage />} />
          <Route path="/jobs/search" element={<JobSearchPage />} />
          <Route path="/jobs/finance" element={<JobFinancePage />} />
          <Route
            path="/jobs/category/:categoryName"
            element={<JobListingPage />}
          />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/resume/upload" element={<ResumeUploadPage />} />
          <Route
            path="/resume/how-it-works"
            element={<ResumeHowItWorksPage />}
          />
          <Route path="/interview" element={<InterviewPage />} />
          <Route
            path="/interview/questions"
            element={<InterviewQuestionsPage />}
          />
          <Route path="/interview/tips" element={<InterviewTipsPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/help/faqs" element={<HelpFaqsPage />} />
          <Route path="/help/contact" element={<HelpContactPage />} />
          <Route path="/help/tutorials" element={<HelpTutorialsPage />} />
          <Route path="/terms" element={<TermsContent />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/applications" element={<AccountPage />} />
          <Route path="/overview" element={<OverviewPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
