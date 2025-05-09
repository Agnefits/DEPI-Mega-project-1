import SignupForm from "../components/auth/SignupForm";
import { signupUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = async ({ name, email, password }) => {
    const result = await signupUser({ name, email, password });
    if (result.success) {
      navigate("/login");
    } else {
      throw new Error(result.message || "Signup failed");
    }
  };

  return (
    <>
        <Navbar/>
        <div style={{ padding: "2rem", maxWidth: "500px", margin: "auto" }}>
        <SignupForm onSignup={handleSignup} />
        </div>
    </>
  );
};

export default Signup;
