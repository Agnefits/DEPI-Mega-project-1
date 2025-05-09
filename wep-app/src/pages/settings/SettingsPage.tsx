
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Check, Trash2 } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SettingsSidebar from "@/components/settings/SettingsSidebar";
import ProfileSettings from "@/components/settings/ProfileSettings";
import LoginSettings from "@/components/settings/LoginSettings";
import NotificationSettings from "@/components/settings/NotificationSettings";
import DeleteAccountModal from "@/components/settings/DeleteAccountModal";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header isAuthenticated={true} />
      <div className="flex-grow flex">
        <SettingsSidebar />
        <main className="flex-grow px-8 py-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Settings</h1>
            <Button variant="outline" className="bg-white" asChild>
              <a href="/">Back to homepage</a>
            </Button>
          </div>
          
          <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-8 border-b w-full justify-start bg-transparent h-auto p-0 space-x-6">
              <TabsTrigger 
                value="profile" 
                className="pb-3 rounded-none border-b-2 border-transparent data-[state=active]:border-jobblue data-[state=active]:shadow-none bg-transparent px-0"
              >
                My Profile
              </TabsTrigger>
              <TabsTrigger 
                value="login" 
                className="pb-3 rounded-none border-b-2 border-transparent data-[state=active]:border-jobblue data-[state=active]:shadow-none bg-transparent px-0"
              >
                Login Details
              </TabsTrigger>
              <TabsTrigger 
                value="notifications" 
                className="pb-3 rounded-none border-b-2 border-transparent data-[state=active]:border-jobblue data-[state=active]:shadow-none bg-transparent px-0"
              >
                Notifications
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <ProfileSettings />
            </TabsContent>
            
            <TabsContent value="login">
              <LoginSettings />
            </TabsContent>
            
            <TabsContent value="notifications">
              <NotificationSettings />
            </TabsContent>
          </Tabs>
          
          {activeTab === "login" && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-red-600">Delete Account</h2>
                  <p className="text-gray-600 mt-2">
                    Permanently delete your account and all your data
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  className="border-red-600 text-red-600 hover:bg-red-50"
                  onClick={() => setShowDeleteModal(true)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Account
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>
      <Footer />
      
      <DeleteAccountModal open={showDeleteModal} onOpenChange={setShowDeleteModal} />
    </div>
  );
};

export default SettingsPage;
