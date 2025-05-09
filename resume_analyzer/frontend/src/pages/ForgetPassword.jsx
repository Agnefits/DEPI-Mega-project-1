import React from "react";
import ForgetForm from "../components/auth/ForgetForm";
import { sendPasswordResetEmail } from "../api/auth";

const ForgotPassword = () => {
    const handleResetRequest = async (email) => {
        const res = await sendPasswordResetEmail(email);
        if (!res.success) throw new Error(res.message);
    };

    return <ForgetForm onRequestReset={handleResetRequest} />;
};

export default ForgotPassword;
