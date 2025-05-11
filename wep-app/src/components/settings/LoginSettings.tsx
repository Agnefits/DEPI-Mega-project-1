
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";
import { useUserStore } from "@/reducers/UserReducerStore";
const LoginSettings = () => {
  const [email, setEmail] = useState("a.safwat@gmail.com");
  const [emailVerified, setEmailVerified] = useState(true);
  const { changePassword , ChangePasswordRequest ,setChangePasswordRequest} = useUserStore();
  const [PasswordChange , setPasswordChange] = useState(ChangePasswordRequest)

  const PasswordChangeHandler=(e)=>{
    setChangePasswordRequest({
      ...ChangePasswordRequest,
      [e.target.name]: e.target.value
    })
    console.log(ChangePasswordRequest)
   
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await changePassword(ChangePasswordRequest);
      console.log("Password changed:", ChangePasswordRequest);
    } catch (err) {
      // Error is handled via the store's error state
    }
  }
  
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Basic Information</h2>
        <p className="text-gray-600">This is login information that you can update anytime.</p>
      </div>
      
      <div className="mb-8 pb-6 border-b border-gray-200">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-medium">Update Email</h3>
          <div className="flex items-center">
            <span className="text-gray-600 mr-2">{email}</span>
            {emailVerified && (
              <div className="bg-green-50 p-1 rounded-full">
                <Check size={16} className="text-green-600" />
              </div>
            )}
          </div>
        </div>
        
        <p className="text-gray-600 mb-2">
          Your email address is verified.
        </p>
        
        <div className="mt-4">
          <h4 className="font-medium mb-2">Update Email</h4>
          <div className="flex gap-4">
            <Input 
              placeholder="Enter your new email"
              className="flex-grow"
            />
            <Button className="bg-jobblue hover:bg-jobblue-dark whitespace-nowrap">
              update email
            </Button>
          </div>
        </div>
      </div>
      
      <div>
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-medium">New Password</h3>
            <p className="text-gray-600 mb-4">
              Manage your password to make sure it is safe
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label 
              htmlFor="oldPassword" 
              className="block text-sm font-medium mb-1"
            >
              Old Password
            </label>
            <Input 
            name="oldPassword"
              id="oldPassword" 
              type="password"
              placeholder="Enter your old password"
              onChange={PasswordChangeHandler}
            />
            <p className="text-xs text-gray-500 mt-1">Minimum 8 characters</p>
          </div>
          
          <div>
            <label 
              htmlFor="newPassword" 
              className="block text-sm font-medium mb-1"
            >
              New Password
            </label>
            <Input 
             name="newPassword"
              id="newPassword" 
              type="password"
              placeholder="Enter your new password"
              onChange={PasswordChangeHandler}
            />
            <p className="text-xs text-gray-500 mt-1">Minimum 8 characters</p>
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <Button className="bg-jobblue hover:bg-jobblue-dark" onClick={handleSubmit}>
            Change Password
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginSettings;
