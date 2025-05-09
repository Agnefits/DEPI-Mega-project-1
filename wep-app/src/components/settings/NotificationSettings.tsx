
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useNotificationStore } from "@/reducers/NotificationReducerStore";
import { Button } from "../ui/button";

const NotificationSettings = () => {
  const {updateNotificationSettings } = useNotificationStore();
  const [notifications, setNotifications] = useState({
    applicationsOn: true,
    jobsOn: true,
    recommendationsOn: false,
});
const handleCheckboxChange = (name: string, checked: boolean) => {
  if (typeof checked !== "boolean") return;
  setNotifications((prev) => ({
    ...prev,
    [name]: checked,
  }));
};

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Basic Information</h2>
        <p className="text-gray-600">This is notifications preferences that you can update anytime.</p>
      </div>
      
      <div className="mb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Notifications</h3>
            <p className="text-gray-600">
              Customize your preferred notification settings
            </p>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <Checkbox id="applications" 
                defaultChecked 
                name="applicationsOn" 
                checked={notifications.applicationsOn}
                onCheckedChange={(checked) => handleCheckboxChange("applicationsOn", checked)}/>
                <Label htmlFor="applications" className="font-medium">Applications</Label>
              </div>
              <p className="text-gray-600 text-sm ml-6 mt-1">
                These are notifications for jobs that you have applied to
              </p>
            </div>
          </div>
          
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <Checkbox id="jobs"  name="jobsOn" checked={notifications.jobsOn}
  onCheckedChange={(checked) => handleCheckboxChange("jobsOn", checked)} />
                <Label htmlFor="jobs" className="font-medium">Jobs</Label>
              </div>
              <p className="text-gray-600 text-sm ml-6 mt-1">
                These are notifications for job openings that suit your profile
              </p>
            </div>
          </div>
          
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <Checkbox id="recommendations" name="recommendationsOn" 
                checked={notifications.recommendationsOn}
  onCheckedChange={(checked) => handleCheckboxChange("recommendationsOn", checked)} />
                <Label htmlFor="recommendations" className="font-medium">Recommendations</Label>
              </div>
              <p className="text-gray-600 text-sm ml-6 mt-1">
                These are notifications for personalized recommendations from our recruiters
              </p>
            </div>
          </div>
        </div>
      </div>
      <Button className="w-25" onClick={() => {
        updateNotificationSettings(notifications);
        console.log(notifications);
      }}>Save</Button>
    </div>
  );
};

export default NotificationSettings;
