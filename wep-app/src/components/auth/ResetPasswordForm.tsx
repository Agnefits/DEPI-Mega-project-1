
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useUserStore } from "@/reducers/UserReducerStore";
const ResetPasswordForm = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
const { resetPassword  , resetPasswordRequest} = useUserStore();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    useUserStore.setState({ resetPasswordRequest: { email: resetPasswordRequest.email, resetCode: resetPasswordRequest.resetCode, newPassword: password } });
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    resetPassword({ email: resetPasswordRequest.email, resetCode: resetPasswordRequest.resetCode, newPassword: password });
    console.log("Password reset Request:", { resetPasswordRequest });
    console.log("Password reset:", { password, confirmPassword });
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-md w-full">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
        Forgot your password?
      </h2>
      <h3 className="text-3xl font-bold text-gray-800 text-center mb-2">
        Let's help you
      </h3>
      <p className="text-3xl font-bold text-jobblue text-center mb-8">
        get back on track!
      </p>

      {isSubmitted ? (
        <div className="text-center">
          <div className="bg-green-100 text-green-800 rounded-md p-4 mb-6">
            Password updated successfully.
          </div>
          <p className="mb-6">Your password has been successfully reset.</p>
          <Link to="/login">
            <Button className="bg-jobblue hover:bg-jobblue-dark text-white px-10">
              Login
            </Button>
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <p className="mb-6 text-center">
            Create a new password.<br />
            Ensure it differs from previous ones for security
          </p>
          
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jobblue focus:border-transparent"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">Confirm Password</label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Enter password"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jobblue focus:border-transparent"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-jobblue hover:bg-jobblue-dark text-white py-6"
          >
            Update Password
          </Button>
        </form>
      )}
    </div>
  );
};

export default ResetPasswordForm;
