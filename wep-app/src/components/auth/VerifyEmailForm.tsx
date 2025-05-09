import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/reducers/UserReducerStore";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const FormSchema = z.object({
  otp: z.string().length(5, {
    message: "Your one-time password must be exactly 6 characters.",
  }),
});

export default function VerifyEmailForm() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { resetPasswordRequest } = useUserStore();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("VerifyEmailForm: Initial resetPasswordRequest:", resetPasswordRequest);
    console.log("VerifyEmailForm: Location state:", state);

    const email = state?.email || resetPasswordRequest?.email;

    if (!email) {
      console.error("VerifyEmailForm: Email is missing");
      toast({
        title: "Error",
        description: "Email is missing. Please start the process again.",
        variant: "destructive",
      });
      navigate("/forgot-password");
      return;
    }
    try {
      useUserStore.setState({
        resetPasswordRequest: {
          email,
          resetCode: data.otp,
          newPassword: resetPasswordRequest?.newPassword || "",
        },
      });

      const updatedResetPasswordRequest = useUserStore.getState().resetPasswordRequest;
      console.log("VerifyEmailForm: Updated resetPasswordRequest:", updatedResetPasswordRequest);
    } catch (err) {
      console.error("Error setting resetPasswordRequest:", err);
      toast({
        title: "Error",
        description: "Failed to process OTP. Please try again.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Email Verified",
      description: "You have successfully verified your email.",
    });

    navigate("/reset-password", {
      state: { email, resetCode: data.otp },
    });

    console.log("VerifyEmailForm: Submitted OTP:", data.otp);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem className="mx-auto space-y-3 flex flex-col justify-center">
              <FormLabel className="text-center">Enter verification code</FormLabel>
              <FormDescription className="text-center">
                We&apos;ve sent a code to your email. Please enter it below to verify your account.
              </FormDescription>
              <FormControl>
                <InputOTP maxLength={5} {...field}>
                  <InputOTPGroup className="w-full flex items-center justify-center gap-3">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <InputOTPSlot key={index} index={index} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Verify Email
        </Button>
        <FormDescription className="text-center">
          Didn&apos;t receive a code?{" "}
          <Link to="#" className="text-jobblue hover:underline">
            Resend
          </Link>
        </FormDescription>
      </form>
    </Form>
  );
}
