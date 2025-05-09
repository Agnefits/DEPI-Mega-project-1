
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const ProfileSettings = () => {
  const [profileImage, setProfileImage] = useState<string>("https://randomuser.me/api/portraits/men/44.jpg");
  
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Basic Information</h2>
        <p className="text-gray-600">This is your personal information that you can update anytime.</p>
      </div>
      
      <div className="mb-8 pb-6 border-b border-gray-200">
        <h3 className="text-lg font-medium mb-2">Profile Photo</h3>
        <p className="text-gray-600 mb-4">
          This image will be shown publicly as your profile picture, it will help recruiters recognize you!
        </p>
        
        <div className="flex items-start gap-6">
          <img 
            src={profileImage}
            alt="Profile" 
            className="w-24 h-24 rounded-full object-cover border" 
          />
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 16L8.586 11.414C8.96106 11.0391 9.46967 10.8284 10 10.8284C10.5303 10.8284 11.0389 11.0391 11.414 11.414L16 16M14 14L15.586 12.414C15.9611 12.0391 16.4697 11.8284 17 11.8284C17.5303 11.8284 18.0389 12.0391 18.414 12.414L20 14M14 8H14.01M6 20H18C18.5304 20 19.0391 19.7893 19.4142 19.4142C19.7893 19.0391 20 18.5304 20 18V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4H6C5.46957 4 4.96086 4.21071 4.58579 4.58579C4.21071 4.96086 4 5.46957 4 6V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20Z" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p className="mt-2 font-medium text-center">Click to replace</p>
            <p className="text-xs text-gray-500 text-center mt-1">or drag and drop</p>
            <p className="text-xs text-gray-500 text-center mt-1">SVG, PNG, JPG or GIF (max. 400 x 400px)</p>
          </div>
        </div>
      </div>
      
      <div className="mb-8 pb-6 border-b border-gray-200">
        <h3 className="text-lg font-medium mb-4">Personal Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="fullName">Full Name (required)</Label>
            <Input 
            name="fullname"
              id="fullName" 
              defaultValue="Ahmed Safwat" 
              className="mt-1" 
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phoneNumber">Phone Number (required)</Label>
              <Input 
                id="phoneNumber" 
                defaultValue="+02 012345678" 
                className="mt-1" 
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email (required)</Label>
              <Input 
                id="email" 
                defaultValue="a.safwat@gmail.com" 
                className="mt-1"
                readOnly 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dob">Date of Birth (required)</Label>
              <Input 
                id="dob" 
                type="date" 
                defaultValue="2000-10-01" 
                className="mt-1" 
              />
            </div>
            
            <div>
              <Label htmlFor="gender">Gender (required)</Label>
              <select 
                id="gender" 
                defaultValue="male"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm mt-1"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Account Type</h3>
        <p className="text-gray-600 mb-4">You can update your account type</p>
        
        <RadioGroup defaultValue="job_seeker" className="space-y-4">
          <div className="flex items-center space-x-2 border rounded-md p-4">
            <RadioGroupItem value="job_seeker" id="job_seeker" />
            <div className="grid gap-1.5">
              <Label htmlFor="job_seeker" className="font-medium">Job Seeker</Label>
              <p className="text-sm text-muted-foreground">Looking for a job</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 border rounded-md p-4">
            <RadioGroupItem value="employer" id="employer" />
            <div className="grid gap-1.5">
              <Label htmlFor="employer" className="font-medium">Employer</Label>
              <p className="text-sm text-muted-foreground">Hiring, sourcing candidates, or posting a jobs</p>
            </div>
          </div>
        </RadioGroup>
      </div>
      
      <div className="flex justify-end">
        <Button className="bg-jobblue hover:bg-jobblue-dark">Save Profile</Button>
      </div>
    </div>
  );
};

export default ProfileSettings;
