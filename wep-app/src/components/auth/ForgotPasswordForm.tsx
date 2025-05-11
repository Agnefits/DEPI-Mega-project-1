
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link, Navigate , useNavigate } from "react-router-dom";
import { useUserStore } from "@/reducers/UserReducerStore";


const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { forgetPassword , resetPasswordRequest} = useUserStore();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      useUserStore.setState({
        resetPasswordRequest: { email : email , resetCode: '', newPassword: '' },
      });
      console.log("Password reset:", { resetPasswordRequest });
      await forgetPassword(email);
      setIsSubmitted(true);
      navigate('/verify-email', { state: { email } });
    } catch (err) {
      // Error is handled via the store's error state
    }
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
          <Navigate to="/verify-email" replace={true} />
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <p className="mb-6 text-center">Enter your email to receive a password reset code</p>
          
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 mb-2">Enter your email address</label>
            <input
              id="email"
              type="email"
              placeholder="Enter email address"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jobblue focus:border-transparent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-jobblue hover:bg-jobblue-dark text-white py-6"
          >
            Send Code
          </Button>
        </form>
      )}
    </div>
  );
};

export default ForgotPasswordForm;
